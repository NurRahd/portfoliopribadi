import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertProfileSchema, type Profile, type InsertProfile } from "@shared/schema";

interface ProfileFormProps {
  profile?: Profile;
  isLoading: boolean;
}

export function ProfileForm({ profile, isLoading }: ProfileFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InsertProfile>({
    resolver: zodResolver(insertProfileSchema),
    defaultValues: profile ? {
      fullName: profile.fullName,
      position: profile.position,
      email: profile.email,
      phone: profile.phone || "",
      location: profile.location || "",
      bio: profile.bio || "",
      age: profile.age || undefined,
      linkedinUrl: profile.linkedinUrl || "",
      githubUrl: profile.githubUrl || "",
      twitterUrl: profile.twitterUrl || "",
      instagramUrl: profile.instagramUrl || "",
      youtubeUrl: profile.youtubeUrl || "",
      photoUrl: profile.photoUrl || "",
    } : undefined,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: InsertProfile) => {
      const response = await apiRequest("PUT", "/api/profile", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handler upload foto profile
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload/profile-photo", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setValue("photoUrl", data.url, { shouldValidate: true });
  };

  const photoUrl = watch("photoUrl");

  const onSubmit = (data: InsertProfile) => {
    // Hanya field yang dikenali backend
    const allowedFields = [
      'fullName', 'position', 'email', 'phone', 'location', 'bio', 'age',
      'linkedinUrl', 'githubUrl', 'twitterUrl', 'instagramUrl', 'youtubeUrl', 'photoUrl'
    ];
    const cleanData: Record<string, any> = {};
    allowedFields.forEach(key => {
      let value = (data as any)[key];
      if (key === 'age') {
        value = !value || isNaN(Number(value)) ? null : Number(value);
      }
      cleanData[key] = value === undefined ? null : value;
    });
    console.log('Payload ke backend:', cleanData);
    updateProfileMutation.mutate(cleanData);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-12 w-32" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            {...register("fullName")}
            className="mt-2"
            required
          />
          {errors.fullName && (
            <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            id="position"
            {...register("position")}
            className="mt-2"
            required
          />
          {errors.position && (
            <p className="text-sm text-destructive mt-1">{errors.position.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="mt-2"
            required
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            {...register("phone")}
            className="mt-2"
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            {...register("location")}
            className="mt-2"
          />
          {errors.location && (
            <p className="text-sm text-destructive mt-1">{errors.location.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="mt-2"
          />
          {errors.age && (
            <p className="text-sm text-destructive mt-1">{errors.age.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          rows={4}
          {...register("bio")}
          className="mt-2 resize-none"
        />
        {errors.bio && (
          <p className="text-sm text-destructive mt-1">{errors.bio.message}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
          <Input
            id="linkedinUrl"
            {...register("linkedinUrl")}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input
            id="githubUrl"
            {...register("githubUrl")}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="twitterUrl">Twitter URL</Label>
          <Input
            id="twitterUrl"
            {...register("twitterUrl")}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="instagramUrl">Instagram URL</Label>
          <Input
            id="instagramUrl"
            {...register("instagramUrl")}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="youtubeUrl">YouTube URL</Label>
          <Input
            id="youtubeUrl"
            {...register("youtubeUrl")}
            className="mt-2"
          />
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor="photoUrl">Profile Photo</Label>
        <Input
          id="photoUrl"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="mt-2"
        />
        {photoUrl && (
          <img src={photoUrl} alt="Profile Preview" className="mt-2 rounded w-32 h-32 object-cover border" />
        )}
      </div>

      <Button 
        type="submit" 
        disabled={updateProfileMutation.isPending}
        className="bg-primary hover:bg-primary/90"
      >
        {updateProfileMutation.isPending ? (
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          "Update Profile"
        )}
      </Button>
    </form>
  );
}
