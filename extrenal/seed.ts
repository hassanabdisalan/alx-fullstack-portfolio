// @ts-nocheck
import {
  PrismaClient,
  Role,
  UserStatus,
  LeadSource,
  PriorityLevel,
  SatisfactionLevel,
  Platform,
  TicketType,
  TicketStatus,
  SocialPlatforms,
  LeadStatus,
} from "../src/generated";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
const currentDate = new Date();
const months = [];
for (let i = 0; i < 4; i++) {
  const date = new Date();
  date.setMonth(currentDate.getMonth() - i);
  months.push(date.toLocaleString("default", { month: "short" }));
}
async function main(version: number) {
  console.log(`Starting seed ${version}...`);
  // Clear existing data (if needed)
  // await clearDatabase();

  // Create admin user first
  const adminUser = await createAdminUser(version);

  // Create business with admin as owner
  const business = await createBusiness(adminUser.id);

  // Create employees with specific roles for the business
  const employees = await createEmployees(business.id);

  // Create additional users for the business
  const users = await createUsers(business.id, 10);

  // Create customers
  const customers = await createCustomers(business.id, 50);

  // Create customer segments for better marketing analysis
  // await createCustomerSegments(customers, business.id);

  // Create orders for customers
  await createOrders(customers, business.id, 100);

  // Create sales revenue metrics
  // await createSalesRevenue(business.id, users.filter(u => u.role === Role.SalesRep));

  // Create customer feedback
  await createFeedback(customers, business.id);

  // Create leads
  await createLeads(business.id, users, 30);

  // Create campaigns
  const campaigns = await createCampaigns(business.id, 5);

  // Create posts for campaigns
  await createPosts(campaigns);

  // Create tickets
  await createTickets(business.id, 20);

  // Create social profiles
  await createSocials(business.id);

  // Create sentiments
  await createSentiments(business.id);

  // Create events for users
  await createEvents(users);

  // Create worklogs
  await createWorklogs(users, business.id);

  // Create notifications
  await createNotifications(users);

  console.log("Seeding completed successfully!");
}

async function clearDatabase() {
  // Delete data in the reverse order of dependencies
  await prisma.notifications.deleteMany();
  await prisma.sentiments.deleteMany();
  await prisma.posts.deleteMany();
  await prisma.socials.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.events.deleteMany();
  await prisma.worklog.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.inviteToken.deleteMany();
  await prisma.users.deleteMany();
  await prisma.business.deleteMany();

  console.log("Database cleared");
}

async function createAdminUser(version: number) {
  const adminName = `admin${version}`;
  const Fname = faker.person.firstName();
  const Sname = faker.person.lastName();
  const adminEmail = `${adminName}@email.com`;
  const hashedPassword = await bcrypt.hash(adminEmail, 10);

  return await prisma.users.create({
    data: {
      Fname,
      Sname,
      email: adminEmail,
      password: hashedPassword,
      phone: faker.phone.number({ style: "international" }),
      role: Role.Admin,
      status: UserStatus.Active,
      profileUrl: `https://picsum.photos/seed/${Fname.toLowerCase()}-${Sname.toLowerCase()}/100`,
      lastLogin: faker.date.recent(),
    },
  });
}

async function createBusiness(ownerId: number) {
  const business = await prisma.business.create({
    data: {
      name: faker.company.name(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: "international" }),
      location: faker.location.city() + ", " + faker.location.country(),
      ownerId: ownerId,
    },
  });
  console.log(`Created business: ${business.name}`);
  await prisma.users.update({
    where: { id: ownerId },
    data: { businessId: business.id },
  });
  console.log(`Assigned owner ${ownerId} to business ${business.id}`);

  return business;
}

async function createEmployees(businessId: number) {
  const employees: any[] = [];

  // Create one employee of each role to ensure business has complete staff
  const employeeRoles = [
    { role: Role.SalesRep, title: "Sales Manager" },
    { role: Role.SalesRep, title: "Account Executive" },
    { role: Role.SalesRep, title: "Business Development Rep" },
    { role: Role.MarketingRep, title: "Marketing Director" },
    { role: Role.MarketingRep, title: "Social Media Specialist" },
    { role: Role.CustomerSupportRep, title: "Support Team Lead" },
    { role: Role.CustomerSupportRep, title: "Customer Success Manager" },
  ];

  for (const employeeRole of employeeRoles) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const hashedPassword = await bcrypt.hash(email, 10);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 120));

    const employee = await prisma.users.create({
      data: {
        Fname: firstName,
        Sname: lastName,
        email: email,
        password: hashedPassword,
        phone: faker.phone.number({ style: "international" }),
        role: employeeRole.role,
        status: UserStatus.Active,
        profileUrl: `https://picsum.photos/seed/${firstName.toLowerCase()}-${lastName.toLowerCase()}/100`,
        businessId: businessId,
        lastLogin: faker.date.recent({ days: 5 }),
        createdAt: createdAt, // Use our custom date
      },
    });

    employees.push({
      ...employee,
      title: employeeRole.title,
    });

    console.log(`Created ${employeeRole.title}: ${firstName} ${lastName}`);
  }

  return employees;
}

async function createUsers(businessId: number, count: number) {
  const users: any[] = [];
  const roles = [Role.MarketingRep, Role.SalesRep, Role.CustomerSupportRep];

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({
      firstName: firstName.toLocaleLowerCase(),
      lastName: lastName.toLocaleLowerCase(),
      provider: "email.com",
    });
    const hashedPassword = await bcrypt.hash(email, 10);
    const role = roles[Math.floor(Math.random() * roles.length)];
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 120));
    const user = await prisma.users.create({
      data: {
        Fname: firstName,
        Sname: lastName,
        email,
        password: hashedPassword,
        phone: faker.phone.number({ style: "international" }),
        role: role,
        status: UserStatus.Active,
        profileUrl: `https://picsum.photos/seed/${firstName.toLowerCase()}-${lastName.toLowerCase()}/100`,
        businessId: businessId,
        lastLogin: Math.random() > 0.5 ? faker.date.recent() : null,
        lastLogout: Math.random() > 0.5 ? faker.date.recent() : null,
        createdAt: createdAt, // Use our custom date
      },
    });

    users.push(user);
  }

  return users;
}

async function createCustomers(businessId: number, count: number) {
  const customers: any[] = [];

  // Customer types for more realistic segmentation
  const customerTypes = [
    { type: "Individual", weight: 0.6 },
    { type: "Small Business", weight: 0.25 },
    { type: "Enterprise", weight: 0.15 },
  ];

  // Customer lifetime values
  const lifetimeValues = [
    { range: "Low", min: 100, max: 1000, weight: 0.5 },
    { range: "Medium", min: 1001, max: 10000, weight: 0.35 },
    { range: "High", min: 10001, max: 50000, weight: 0.15 },
  ];

  // Industries for business customers
  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Real Estate",
    "Transportation",
  ];

  const createdTypes: Record<string, number> = {};
  const createdLtv: Record<string, number> = {};

  for (let i = 0; i < count; i++) {
    // Select customer type based on weights
    const typeRandom = Math.random();
    let cumulativeWeight = 0;
    let selectedType = customerTypes[0].type;

    for (const type of customerTypes) {
      cumulativeWeight += type.weight;
      if (typeRandom <= cumulativeWeight) {
        selectedType = type.type;
        break;
      }
    }

    createdTypes[selectedType] = (createdTypes[selectedType] || 0) + 1;

    // Select lifetime value range
    const ltvRandom = Math.random();
    cumulativeWeight = 0;
    let selectedLtv = lifetimeValues[0];

    for (const ltv of lifetimeValues) {
      cumulativeWeight += ltv.weight;
      if (ltvRandom <= cumulativeWeight) {
        selectedLtv = ltv;
        break;
      }
    }

    createdLtv[selectedLtv.range] = (createdLtv[selectedLtv.range] || 0) + 1;

    // Generate random LTV within the selected range
    const lifetimeValue = faker.number.int({
      min: selectedLtv.min,
      max: selectedLtv.max,
    });

    // For business customers, assign an industry
    const industry =
      selectedType !== "Individual"
        ? industries[Math.floor(Math.random() * industries.length)]
        : null;

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    // Create either a company name or use person's name based on customer type
    const displayName =
      selectedType === "Individual"
        ? `${firstName} ${lastName}`
        : faker.company.name();
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 120));
    const customer = await prisma.customer.create({
      data: {
        Fname: firstName,
        Sname: lastName,
        email: faker.internet.email({ firstName, lastName }),
        phone: faker.phone.number({ style: "international" }),
        businessId: businessId,
        createdAt: createdAt, // Use our custom date
      },
    });

    // Attach the extra metadata to the returned object (not saved in DB)
    customers.push({
      ...customer,
      customerType: selectedType,
      lifetimeValue: lifetimeValue,
      industry: industry,
      displayName: displayName,
    });
  }

  // Log customer distribution
  console.log("Customer segments created:");
  for (const [type, count] of Object.entries(createdTypes)) {
    console.log(`- ${type}: ${count} customers`);
  }

  console.log("Customer lifetime value distribution:");
  for (const [range, count] of Object.entries(createdLtv)) {
    console.log(`- ${range}: ${count} customers`);
  }

  return customers;
}

async function createOrders(
  customers: any[],
  businessId: number,
  count: number,
) {
  // Product categories with price ranges
  const productCategories = [
    { name: "Basic Subscription", minPrice: 99, maxPrice: 299 },
    { name: "Premium Subscription", minPrice: 299, maxPrice: 999 },
    { name: "Enterprise Subscription", minPrice: 999, maxPrice: 5999 },
    { name: "Consulting Services", minPrice: 1500, maxPrice: 10000 },
    { name: "Training", minPrice: 499, maxPrice: 2999 },
  ];

  // Create order date distribution - spread evenly across past 4 months
  const orderDates: Date[] = [];
  for (let i = 0; i < count; i++) {
    // Days ago will be between 0 and 120 (4 months)
    const daysAgo = Math.floor(Math.random() * 120);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    orderDates.push(date);
  }

  // Sort dates chronologically
  orderDates.sort((a, b) => a.getTime() - b.getTime());

  // Assign customers to orders - high value customers make more orders
  const customerOrders: Record<number, number> = {};

  // First pass - assign at least one order to each customer
  for (const customer of customers) {
    customerOrders[customer.id] = 1;
  }

  // Second pass - distribute remaining orders with preference to high value customers
  const remainingOrders = count - customers.length;
  if (remainingOrders > 0) {
    // Sort customers by lifetime value (if available)
    const sortedCustomers = [...customers].sort(
      (a, b) => (b.lifetimeValue || 0) - (a.lifetimeValue || 0),
    );

    // Top 20% of customers get 80% of remaining orders (Pareto principle)
    const topCustomers = sortedCustomers.slice(
      0,
      Math.ceil(sortedCustomers.length * 0.2),
    );
    const topCustomerOrderCount = Math.floor(remainingOrders * 0.8);
    const regularCustomerOrderCount = remainingOrders - topCustomerOrderCount;

    // Distribute orders among top customers
    for (let i = 0; i < topCustomerOrderCount; i++) {
      const customerIndex = Math.floor(Math.random() * topCustomers.length);
      const customer = topCustomers[customerIndex];
      customerOrders[customer.id] = (customerOrders[customer.id] || 0) + 1;
    }

    // Distribute remaining orders among other customers
    for (let i = 0; i < regularCustomerOrderCount; i++) {
      const customerIndex = Math.floor(Math.random() * sortedCustomers.length);
      const customer = sortedCustomers[customerIndex];
      customerOrders[customer.id] = (customerOrders[customer.id] || 0) + 1;
    }
  }

  // Create orders
  let orderIndex = 0;
  const ordersByCategory: Record<string, number> = {};

  for (const [customerId, orderCount] of Object.entries(customerOrders)) {
    const customer = customers.find((c) => c.id === Number(customerId));
    if (!customer) continue;

    // Get appropriate product categories based on customer type
    let availableCategories = productCategories;
    if (customer.customerType === "Individual") {
      // Individuals typically don't buy enterprise products
      availableCategories = productCategories.filter(
        (c) => !c.name.includes("Enterprise") && !c.name.includes("Consulting"),
      );
    }

    for (let i = 0; i < orderCount && orderIndex < orderDates.length; i++) {
      // Select product category - high value customers more likely to buy premium products
      const categoryIndex =
        customer.lifetimeValue > 5000
          ? Math.floor(Math.random() * availableCategories.length)
          : Math.floor(Math.random() * Math.min(2, availableCategories.length));

      const category = availableCategories[categoryIndex];
      ordersByCategory[category.name] =
        (ordersByCategory[category.name] || 0) + 1;

      const productCost = faker.number.int({
        min: category.minPrice,
        max: category.maxPrice,
      });
      const totalAmount = productCost * 1.16; // Adding VAT

      await prisma.order.create({
        data: {
          customerId: Number(customerId),
          businessId: businessId,
          productCost: productCost,
          totalAmount: totalAmount,
          createdAt: orderDates[orderIndex++],
        },
      });
    }
  }

  // Log order distribution
  console.log("Order distribution by product category:");
  for (const [category, count] of Object.entries(ordersByCategory)) {
    console.log(`- ${category}: ${count} orders`);
  }
}

async function createFeedback(customers: any[], businessId: number) {
  const satisfactionLevels = [
    SatisfactionLevel.Excellent,
    SatisfactionLevel.Good,
    SatisfactionLevel.Average,
    SatisfactionLevel.Poor,
  ];

  // Create feedback for about half of the customers
  const customerSelection = customers.slice(
    0,
    Math.floor(customers.length * 0.5),
  );

  for (const customer of customerSelection) {
    // Create random date within past 4 months
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 120));

    await prisma.feedback.create({
      data: {
        customerId: customer.id,
        businessId: businessId,
        satisfaction:
          satisfactionLevels[
            Math.floor(Math.random() * satisfactionLevels.length)
          ],
        createdAt: createdAt, // Use our custom date
      },
    });
  }
}

async function createLeads(businessId: number, users: any[], count: number) {
  const leadSources = [
    LeadSource.Web_Form,
    LeadSource.Facebook,
    LeadSource.LinkedIn,
    LeadSource.Whatsapp,
    LeadSource.Twitter,
    LeadSource.Instagram,
    LeadSource.Import,
    LeadSource.Manual,
  ];
  const priorityLevels = [
    PriorityLevel.High,
    PriorityLevel.Medium,
    PriorityLevel.Low,
  ];
  const leadStatuses = [
    LeadStatus.Ongoing,
    LeadStatus.Awaiting,
    LeadStatus.Completed,
  ];
  const stages = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal",
    "Closed Won",
    "Closed Lost",
  ];
  const businessUsers = await prisma.users.findMany({
    where: { businessId: businessId },
  });
  const totalCount = Math.min(count, businessUsers.length);
  for (let i = 0; i < totalCount; i++) {
    // Check if the current user is a sales rep
    const currentUser = businessUsers[i % businessUsers.length];
    const isSalesRep = currentUser.role === Role.SalesRep;

    // Determine how many leads to create for this user
    const leadsToCreate = isSalesRep ? 18 : 3;

    for (let j = 0; j < leadsToCreate; j++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({
        firstName,
        lastName,
        provider: "email.com",
      });

      // Create random date within past 4 months
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 120));

      await prisma.lead.create({
        data: {
          Fname: firstName,
          Sname: lastName,
          email,
          phone: faker.phone.number({ style: "international" }),
          stage: stages[Math.floor(Math.random() * stages.length)],
          status: leadStatuses[Math.floor(Math.random() * leadStatuses.length)],
          source: leadSources[Math.floor(Math.random() * leadSources.length)],
          revenue: Math.floor(
            parseFloat(faker.commerce.price({ min: 1000, max: 50000 })),
          ),
          priority:
            priorityLevels[Math.floor(Math.random() * priorityLevels.length)],
          businessId: businessId,
          salesRepId: currentUser.id,
          createdAt: createdAt, // Use our custom date
        },
      });
    }
  }
}

async function createCampaigns(businessId: number, count: number) {
  const campaigns: any[] = [];
  const channels = [
    "Facebook",
    "Twitter",
    "Linkedin",
    "Instagram",
    "Email",
    "SMS",
  ];

  for (let i = 0; i < count; i++) {
    const startDate = faker.date.future();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 30) + 15); // Add 15-45 days

    // Select 1-3 random channels for each campaign
    const selectedChannels = Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => channels[Math.floor(Math.random() * channels.length)],
    );

    const campaign = await prisma.campaign.create({
      data: {
        title: `${faker.commerce.productAdjective()} ${faker.company.buzzNoun()} Campaign ${i + 1}`,
        description: faker.lorem.paragraph(),
        start: startDate,
        end: endDate,
        channels: selectedChannels,
        businessId: businessId,
      },
    });

    campaigns.push(campaign);
  }

  return campaigns;
}

async function createPosts(campaigns: any[]) {
  const platforms = [
    SocialPlatforms.Facebook,
    SocialPlatforms.Instagram,
    SocialPlatforms.Twitter,
    SocialPlatforms.LinkedIn,
  ];

  for (const campaign of campaigns) {
    const postCount = Math.floor(Math.random() * 5) + 3; // 3-8 posts per campaign

    for (let i = 0; i < postCount; i++) {
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 120));
      await prisma.posts.create({
        data: {
          title: faker.lorem.sentence(),
          platform: platforms[Math.floor(Math.random() * platforms.length)],
          postId: faker.string.uuid(),
          campaignId: campaign.id,
          // createdAt: createdAt, // Use our custom date
        },
      });
    }
  }
}

async function createTickets(businessId: number, count: number) {
  const ticketTypes = [
    TicketType.Technical,
    TicketType.Payments,
    TicketType.Inquiries,
    TicketType.Complains,
  ];
  const platforms = [
    Platform.Emails,
    Platform.Social_Media,
    Platform.Events,
    Platform.Website,
  ];
  const statuses = [
    TicketStatus.Open,
    TicketStatus.Closed,
    TicketStatus.In_progress,
    TicketStatus.Awaiting,
  ];

  for (let i = 0; i < count; i++) {
    // Create random date within past 4 months
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 120));

    // Calculate responded date (if applicable)
    let respondedAt = null;
    if (Math.random() > 0.3) {
      respondedAt = new Date(createdAt);
      respondedAt.setHours(
        respondedAt.getHours() + Math.floor(Math.random() * 48),
      ); // Response within 48 hours
    }

    await prisma.ticket.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number({ style: "international" }),
        description: faker.lorem.paragraph(),
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        tickettype: ticketTypes[Math.floor(Math.random() * ticketTypes.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        respondedAt: respondedAt,
        businessId: businessId,
        createdAt: createdAt, // Use our custom date
      },
    });
  }
}

async function createSocials(businessId: number) {
  const platforms = [
    SocialPlatforms.Facebook,
    SocialPlatforms.Instagram,
    SocialPlatforms.Twitter,
    SocialPlatforms.LinkedIn,
  ];

  for (const platform of platforms) {
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 120));
    await prisma.socials.create({
      data: {
        platform: platform,
        pageId: `page_${platform.toLowerCase()}_${faker.string.alphanumeric(8)}`,
        businessId: businessId,
        // createdAt: createdAt, // Use our custom date
      },
    });
  }
}

async function createSentiments(businessId: number) {
  await prisma.sentiments.create({
    data: {
      positive: Math.floor(Math.random() * 100) + 50, // 50-150 positive sentiments
      negative: Math.floor(Math.random() * 50) + 10, // 10-60 negative sentiments
      neutral: Math.floor(Math.random() * 70) + 30, // 30-100 neutral sentiments
      businessId: businessId,
    },
  });
}

async function createEvents(users: any[]) {
  // Create events spread across past and future
  for (const user of users) {
    const eventCount = Math.floor(Math.random() * 3) + 1; // 1-3 events per user

    for (let i = 0; i < eventCount; i++) {
      // 50% chance of past event (within 4 months), 50% chance of future event
      const isPastEvent = Math.random() > 0.5;

      let startDate;
      if (isPastEvent) {
        startDate = new Date();
        startDate.setDate(
          startDate.getDate() - Math.floor(Math.random() * 120),
        );
      } else {
        startDate = faker.date.future({ years: 0.5 }); // Within next 6 months
      }

      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + Math.floor(Math.random() * 4) + 1); // Add 1-5 hours

      await prisma.events.create({
        data: {
          title: faker.lorem.words(3),
          start: startDate,
          end: endDate,
          description: Math.random() > 0.3 ? faker.lorem.paragraph() : null,
          userId: user.id,
        },
      });
    }
  }
}

async function createWorklogs(users: any[], businessId: number) {
  // Create worklogs spread over the past 4 months
  for (const user of users) {
    const logCount = Math.floor(Math.random() * 10) + 5; // 5-15 logs per user

    for (let i = 0; i < logCount; i++) {
      // Create random date within past 4 months
      const dateRecorded = new Date();
      dateRecorded.setDate(
        dateRecorded.getDate() - Math.floor(Math.random() * 120),
      );

      await prisma.worklog.create({
        data: {
          userId: user.id,
          businessId: businessId,
          hoursWorked: parseFloat((Math.random() * 8 + 1).toFixed(1)), // 1-9 hours, with one decimal
          dateRecorded: dateRecorded,
        },
      });
    }
  }
}

async function createNotifications(users: any[]) {
  const notificationTypes = ["message", "task", "reminder", "alert", "update"];

  for (const user of users) {
    const notificationCount = Math.floor(Math.random() * 5) + 2; // 2-7 notifications per user

    for (let i = 0; i < notificationCount; i++) {
      const type =
        notificationTypes[Math.floor(Math.random() * notificationTypes.length)];

      // Create random date within past 4 months
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 120));

      await prisma.notifications.create({
        data: {
          type: type,
          title: `New ${type}: ${faker.lorem.words(3)}`,
          message: faker.lorem.sentence(),
          readStatus: Math.random() > 0.5, // 50% chance of being read
          userId: user.id,
          createdAt: createdAt, // Use our custom date
        },
      });
    }
  }
}

async function seedAbunch(homwmany: number) {
  await main(7);
  await main(8);
  await main(9);
}

seedAbunch(3)
  .then((results) => {
    console.log("Seeding completed successfully!");
  })
  .catch((e) => {
    console.error("Seeding failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
