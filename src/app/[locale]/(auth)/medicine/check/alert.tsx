// import { zodResolver } from '@hookform/resolvers/zod';
// import {
//   Button,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   useDisclosure,
// } from '@nextui-org/react';
// import type { FormEvent } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';

// const FormSchema = z.object({
//   username: z.string().min(2, {
//     message: 'Username must be at least 2 characters.',
//   }),
// });

// export function AlertDialogDemo() {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       username: '',
//     },
//   });

//   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
//     <Button onPress={onOpen}>Open Modal</Button>;
//     // if (!confirm("Are you sure?")) {
//     //   e.preventDefault();
//     // }
//   };

//   return (
//     <>
//       <form onSubmit={onSubmit}>
//         <input type="text" name="name" />
//         <Button onPress={onOpen}>Open Modal</Button>
//       </form>
//       {/* <Form {...form}>
//       <form onSubmit={form.handleSubmit(onOpen)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Username</FormLabel>
//               <FormControl>
//                 <Input placeholder="shadcn" {...field} />
//               </FormControl>
//               <FormDescription>
//                 This is your public display name.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//        <Button onPress={onOpen}>Open Modal</Button>
//       </form>
//     </Form> */}

//       <Modal
//         isOpen={isOpen}
//         onOpenChange={onOpenChange}
//         isDismissable={false}
//         isKeyboardDismissDisabled
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 Modal Title
//               </ModalHeader>
//               <ModalBody>
//                 <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Nullam pulvinar risus non risus hendrerit venenatis.
//                   Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                 </p>
//                 <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Nullam pulvinar risus non risus hendrerit venenatis.
//                   Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                 </p>
//                 <p>
//                   Magna exercitation reprehenderit magna aute tempor cupidatat
//                   consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
//                   incididunt cillum quis. Velit duis sit officia eiusmod Lorem
//                   aliqua enim laboris do dolor eiusmod. Et mollit incididunt
//                   nisi consectetur esse laborum eiusmod pariatur proident Lorem
//                   eiusmod et. Culpa deserunt nostrud ad veniam.
//                 </p>
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" onPress={onClose}>
//                   Action
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
