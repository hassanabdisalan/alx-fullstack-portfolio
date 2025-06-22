import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UpdateuserImage } from "@/components/authz/UpdateuserImage";
import { UserProfileImageButton } from "@/components/authz/UserProfileImageButton";
import { Button } from "@/components/ui/button";

export function ImageUpdateDemoPage() {
  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8">Profile Image Update</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Standalone Dialog</CardTitle>
            <CardDescription>
              Use this component to update profile image with a dialog trigger
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <UpdateuserImage
              triggerComponent={
                <Button variant="outline">Open Image Upload Dialog</Button>
              }
            />
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            Can be triggered from any UI component
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avatar with Update Button</CardTitle>
            <CardDescription>
              Avatar component with built-in update functionality
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 py-6">
            <UserProfileImageButton size="lg" />
            <UserProfileImageButton size="md" />
            <UserProfileImageButton size="sm" />
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            Hover over the avatar to see the update button
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Implementation Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Uses Apollo Client with the <code>USER_PROFILE_UPDATE</code> mutation</li>
              <li>Handles image preview using FileReader API</li>
              <li>Accepts different trigger components for flexibility</li>
              <li>Includes loading states and error handling</li>
              <li>Updates the global user context automatically on success</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
