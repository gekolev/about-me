import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] min-h-screen flex flex-col justify-center items-center px-6">
      <div className="sm:p-10 max-w-xxl">
        <div className="flex justify-end">
        <Avatar className="h-14 w-14">
              <AvatarImage src="images/mini-me.jpeg" />
              <AvatarFallback>GK</AvatarFallback>
            </Avatar>
        </div>
     
        <div className="">
          <div className="mr-4">
            <h1 className="text-2xl font-bold">Hi, I'm George.</h1>
          </div>
        </div>

        <p className="mt-1 mb-4">
          Developer and aspiring Project Manager who develops user-centered
          products. <br />
          Passionate about creating good things with good people.
        </p>
        <a href="mailto:george.gkolev@gmail.com">
          <Button variant="outline">
            <Mail className="mr-2" /> Say Hello
          </Button>
        </a>
      </div>
    </div>
  );
}
