import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Clock, Instagram, Dribbble, Linkedin, Twitter, Youtube } from "lucide-react";

const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("/api/contact-messages", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact-messages"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
              <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#DCC6AA] mb-8">Send a Message</h2>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#DCC6AA] mb-2">
                    Full Name
                  </label>
                  <Input
                    {...form.register("fullName")}
                    placeholder="Enter your name"
                    className="bg-[#0D0D0D] border-[#333] text-white placeholder:text-gray-500 focus:border-[#DCC6AA]"
                  />
                  {form.formState.errors.fullName && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#DCC6AA] mb-2">
                    Email Address
                  </label>
                  <Input
                    {...form.register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="bg-[#0D0D0D] border-[#333] text-white placeholder:text-gray-500 focus:border-[#DCC6AA]"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#DCC6AA] mb-2">
                    Subject
                  </label>
                  <Input
                    {...form.register("subject")}
                    placeholder="Enter your subject"
                    className="bg-[#0D0D0D] border-[#333] text-white placeholder:text-gray-500 focus:border-[#DCC6AA]"
                  />
                  {form.formState.errors.subject && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#DCC6AA] mb-2">
                    Your Message
                  </label>
                  <Textarea
                    {...form.register("message")}
                    placeholder="Type your message here..."
                    rows={6}
                    className="bg-[#0D0D0D] border-[#333] text-white placeholder:text-gray-500 focus:border-[#DCC6AA] resize-none"
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-[#DCC6AA] hover:bg-[#A08B72] text-[#0D0D0D] font-semibold py-3 transition-all duration-300"
                >
                  {mutation.isPending ? "Sending..." : "SEND MESSAGE"}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
                <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#DCC6AA] mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 text-[#DCC6AA] flex-shrink-0 mt-1">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Location</h4>
                      <p className="text-gray-300 text-sm">123 Photography Street, Bali, Indonesia 70210</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 text-[#DCC6AA] flex-shrink-0 mt-1">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Phone</h4>
                      <p className="text-gray-300 text-sm">+62 (813) 567-8910</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 text-[#DCC6AA] flex-shrink-0 mt-1">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email</h4>
                      <p className="text-gray-300 text-sm">contact@alexchen.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 text-[#DCC6AA] flex-shrink-0 mt-1">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Working Hours</h4>
                      <p className="text-gray-300 text-sm">Monday-Friday: 9AM - 6PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connect With Me */}
              <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
                <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#DCC6AA] mb-4">Connect With Me</h3>
                <p className="text-gray-300 text-sm mb-6">
                  Follow my work and get behind the scenes insights into 
                  my creative process. Join the conversation on social media!
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <a href="#" className="flex items-center justify-center p-3 bg-[#0D0D0D] rounded-lg border border-[#333] hover:border-[#DCC6AA] transition-all duration-300 group">
                    <Instagram size={20} className="text-[#DCC6AA] group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" className="flex items-center justify-center p-3 bg-[#0D0D0D] rounded-lg border border-[#333] hover:border-[#DCC6AA] transition-all duration-300 group">
                    <Dribbble size={20} className="text-[#DCC6AA] group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" className="flex items-center justify-center p-3 bg-[#0D0D0D] rounded-lg border border-[#333] hover:border-[#DCC6AA] transition-all duration-300 group">
                    <Mail size={20} className="text-[#DCC6AA] group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" className="flex items-center justify-center p-3 bg-[#0D0D0D] rounded-lg border border-[#333] hover:border-[#DCC6AA] transition-all duration-300 group">
                    <Linkedin size={20} className="text-[#DCC6AA] group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" className="flex items-center justify-center p-3 bg-[#0D0D0D] rounded-lg border border-[#333] hover:border-[#DCC6AA] transition-all duration-300 group">
                    <Twitter size={20} className="text-[#DCC6AA] group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" className="flex items-center justify-center p-3 bg-[#0D0D0D] rounded-lg border border-[#333] hover:border-[#DCC6AA] transition-all duration-300 group">
                    <Youtube size={20} className="text-[#DCC6AA] group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Value Section */}
          <div className="mt-20 text-center">
            <div className="bg-[#1A1A1A] p-12 rounded-lg border border-[#333]">
              <h2 className="text-4xl font-['Playfair_Display'] font-bold text-[#DCC6AA] mb-4">Value</h2>
              <div className="text-6xl font-bold text-[#DCC6AA] mb-4">$400</div>
              <p className="text-gray-300 max-w-2xl mx-auto">
                I turn ideas into websites clear, responsive, and uniquely yours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}