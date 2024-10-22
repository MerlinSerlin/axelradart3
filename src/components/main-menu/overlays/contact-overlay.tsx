"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

// export function ContactOverlay() {
//   return (
//     <Dialog>
//       <VisuallyHidden>
//         <DialogTitle>Contact</DialogTitle>
//         <DialogDescription>A Form For Contacting The Artist</DialogDescription>
//       </VisuallyHidden>
//       <DialogTrigger asChild>
//       <div>
//           <div className="hidden md:block lg:block">
//             <Button variant="outline">Contact</Button>
//           </div>
//           <h2 className="block sm:hidden text-xl rounded-md border pl-3 p-3">
//             Contact
//           </h2>
//         </div>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Get In Touch</DialogTitle>
//           <DialogDescription>
//             Leave a message and we will get back to you!
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//             <Input
//               id="name"
//               defaultValue="Pedro Duarte"
//               className="col-span-3"
//             />
//             <Label htmlFor="email" className="text-right">
//               Email
//             </Label>
//             <Input
//               id="email"
//               defaultValue="pduarte@hotmail.com"
//               className="col-span-3"
//             />
//           </div>
//           <Textarea placeholder="Type your message here."/>
//         </div>
//         <DialogFooter>
//           <Button type="submit">Send Message</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

export function ContactOverlay() {
  const [isInputActive, setInputActive] = useState(false);

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isInputActive) {
      event.preventDefault(); // Prevent default focus behavior
      event.target.blur(); // Blur the input to prevent keyboard
    }
  };

  const toggleInputActive = () => {
    setInputActive((prev) => !prev);
  };

  return (
    <Dialog>
      <VisuallyHidden>
        <DialogTitle>Contact</DialogTitle>
        <DialogDescription>A Form For Contacting The Artist</DialogDescription>
      </VisuallyHidden>
      <DialogTrigger asChild>
        <div>
          <div className="hidden md:block lg:block">
            <Button variant="outline" onClick={toggleInputActive}>Contact</Button>
          </div>
          <h2 className="block sm:hidden text-xl rounded-md border pl-3 p-3" onClick={toggleInputActive}>
            Contact
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get In Touch</DialogTitle>
          <DialogDescription>
            Leave a message and we will get back to you!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              onFocus={handleInputFocus}
              readOnly={!isInputActive} // Only allow input if active
            />
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              defaultValue="pduarte@hotmail.com"
              className="col-span-3"
              onFocus={handleInputFocus}
              readOnly={!isInputActive} // Only allow input if active
            />
          </div>
          <Textarea
            placeholder="Type your message here."
            onFocus={handleInputFocus}
            readOnly={!isInputActive} // Only allow input if active
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={toggleInputActive}>Send Message</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}