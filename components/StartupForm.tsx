// This is component is rendered on the client side.
// Because it uses a form element, we need to use "use client" at the top of this file.

"use client"


import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';


const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const {toast} = useToast();
  const router = useRouter();

    const handleFormSubmit = async(prevState: any, formData: FormData) => {
      try{
        const formValues = {
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          category: formData.get("category") as string,
          link: formData.get("link") as string,
          pitch,
        };

        await formSchema.parseAsync(formValues);
        
        const result = await createPitch(prevState, formData, pitch);

        console.log(result);
        

        if(result.status === "SUCCESS"){
          toast({
            title: "Success",
            description: "Your startup pitch has been created successfully",
          });
          
          router.push(`/startup/${result._id}`);
        }

        return result;
        
      }catch(error){
        if(error instanceof z.ZodError){
          const fieldErrors = error.flatten().fieldErrors;

          setErrors(fieldErrors as unknown as Record<string, string>);

          toast({
            title: "Error",
            description: "Please check your inputs and try again",
            variant: "destructive",
          });

          return { ...prevState, error: "Validation failed", status: "ERROR"};
        }

        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });

        return { ...prevState, error: "Something went wrong", status: "ERROR"};
      }
    };
  
  // useActionState is a hook that allows us to submit forms without refreshing the page.
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: "", status: "INITIAL"}); 

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form-label">Title</label>
        <Input id="title" name="title" className="startup-form-input" required placeholder="Startup Title" />

        {errors.title && <p className="startup-form-error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form-label">Description</label>
        <Textarea id="description" name="description" className="startup-form-textarea" required placeholder="Startup Description" />

        {errors.description && <p className="startup-form-error">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className="startup-form-label">Category</label>
        <Input id="category" name="category" className="startup-form-input" required placeholder="Startup Category (Tech, Health, Education, etc.)s" />

        {errors.category && <p className="startup-form-error">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="link" className="startup-form-label">Image URL</label>
        <Input id="link" name="link" className="startup-form-input" required placeholder="Startup Image URLs" />

        {errors.link && <p className="startup-form-error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form-label">Pitch</label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{borderRadius: 20, overflow: "hidden"}}
          textareaProps={{
            placeholder: "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.link && <p className="startup-form-error">{errors.link}</p>}
      </div>

      <Button type="submit" className="cursor-pointer startup-form-btn" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="ml-2 size-6" />
      </Button>
    </form>
  )
}

export default StartupForm
