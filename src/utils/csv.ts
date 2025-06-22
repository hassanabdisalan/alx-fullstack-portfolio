/**
 * Exports an array of objects to a downloadable CSV file
 * @param data Array of objects to export
 * @param headers Custom headers (optional) - if not provided, will use object keys
 * @param filename Filename for the downloaded file (without extension)
 * @param keyMap Optional mapping from object keys to header values
 */
export function exportToCsv<T extends Record<string, any>>(
  data: T[],
  filename: string,
  keyMap?: Record<keyof T, string>,
  headers?: string[],
): void {
  if (!data.length) return;

  // Use provided headers or extract them from the first object's keys
  const keys = Object.keys(data[0]);
  const csvHeaders =
    headers || (keyMap ? keys.map((key) => keyMap[key] || key) : keys);

  // Create CSV rows: headers + data
  const csvRows = [
    csvHeaders,
    ...data.map((item) =>
      keys.map((key) => {
        const value = item[key];
        // Handle values that might break CSV format (commas, quotes, etc.)
        if (value === null || value === undefined) return "";
        return typeof value === "string" &&
          (value.includes(",") || value.includes('"') || value.includes("\n"))
          ? `"${value.replace(/"/g, '""')}"` // Escape quotes in the value
          : String(value);
      }),
    ),
  ].map((row) => row.join(","));

  // Join rows with newlines
  const csvContent = csvRows.join("\n");

  // Create and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Imports data from a CSV file and converts it to an array of objects
 * @param file The CSV file to import
 * @param keyMap Optional mapping from header values to object keys
 * @returns Promise resolving to array of objects representing the CSV data
 * @example
 * // React component usage with file input
 * import { importFromCsv, validateCsvHeaders } from "@/utils/csv";
 *
 * // In your component:
 * const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
 *   const file = event.target.files?.[0];
 *   if (!file) return;
 *
 *   // Optional: validate headers first
 *   const expectedHeaders = ["Name", "Email", "Phone"];
 *   const isValid = await validateCsvHeaders(file, expectedHeaders);
 *
 *   if (!isValid) {
 *     // Show error message
 *     return;
 *   }
 *
 *   try {
 *     // Map CSV headers to your data model properties
 *     const keyMap = {
 *       "Name": "fullName",
 *       "Email": "emailAddress",
 *       "Phone": "phoneNumber"
 *     };
 *
 *     // Import the data
 *     const contacts = await importFromCsv(file, keyMap);
 *
 *     // Use the imported data
 *     setContacts(contacts);
 *   } catch (error) {
 *     console.error("Error importing CSV:", error);
 *   }
 * };
 */
export function importFromCsv<T extends Record<string, any>>(
  file: File,
  keyMap?: Record<string, keyof T>,
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const csvText = event.target?.result as string;
        if (!csvText) {
          throw new Error("Failed to read CSV file");
        }

        // Split the CSV into rows
        const rows = csvText.split(/\r?\n/).filter((row) => row.trim());
        if (rows.length < 2) {
          throw new Error(
            "CSV file must contain headers and at least one data row",
          );
        }

        // Parse the headers row
        const headers = parseCSVRow(rows[0]);

        // Process each data row
        const result: T[] = [];
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i].trim()) continue;

          const values = parseCSVRow(rows[i]);
          if (values.length !== headers.length) {
            console.warn(
              `Row ${i} has ${values.length} columns, expected ${headers.length}. Row might be malformed.`,
            );
          }

          const item = {} as T;
          headers.forEach((header, index) => {
            if (index < values.length) {
              const key = keyMap ? (keyMap[header] as string) : header;
              item[key as keyof T] = values[index] as any;
            }
          });

          result.push(item);
        }

        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading CSV file"));
    };

    reader.readAsText(file);
  });
}

/**
 * Helper function to parse a CSV row respecting quoted values
 */
function parseCSVRow(row: string): string[] {
  const result: string[] = [];
  let currentValue = "";
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = row[i + 1];

    if (char === '"' && !inQuotes) {
      // Start of quoted value
      inQuotes = true;
    } else if (char === '"' && inQuotes) {
      // Check if it's an escaped quote
      if (nextChar === '"') {
        currentValue += '"';
        i++; // Skip the next quote
      } else {
        // End of quoted value
        inQuotes = false;
      }
    } else if (char === "," && !inQuotes) {
      // End of value
      result.push(currentValue);
      currentValue = "";
    } else {
      // Regular character
      currentValue += char;
    }
  }

  // Add the last value
  result.push(currentValue);

  return result;
}

/**
 * Helper function to validate a CSV file against expected headers
 * @param file The CSV file to validate
 * @param expectedHeaders Array of expected header values
 * @returns Promise resolving to boolean indicating if validation passed
 * @example
 * // Validate that a CSV file has required headers
 * const fileInput = document.getElementById('csv-upload');
 * const file = fileInput.files[0];
 *
 * const requiredHeaders = ["First Name", "Last Name", "Email"];
 * const isValid = await validateCsvHeaders(file, requiredHeaders);
 *
 * if (isValid) {
 *   // Proceed with import
 *   const contacts = await importFromCsv(file);
 * } else {
 *   // Show error message
 *   alert("CSV file is missing required headers: First Name, Last Name, Email");
 * }
 */
export async function validateCsvHeaders(
  file: File,
  expectedHeaders: string[],
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const csvText = event.target?.result as string;
        const firstLine = csvText.split(/\r?\n/)[0];
        const headers = parseCSVRow(firstLine);

        // Check if all expected headers are present
        const missingHeaders = expectedHeaders.filter(
          (header) => !headers.includes(header),
        );

        if (missingHeaders.length > 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading CSV file"));
    };

    reader.readAsText(file);
  });
}
