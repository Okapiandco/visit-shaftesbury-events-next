"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BusinessCategory, businessCategoryLabels } from '@/types/events';
import { Store, MapPin, Phone, Mail, Globe, Clock, Send, CheckCircle, ImagePlus, X } from 'lucide-react';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 200 * 1024; // 200KB

const SubmitBusinessForm = () => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '' as BusinessCategory | '',
    address: '',
    phone: '',
    email: '',
    website: '',
    openingHours: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error('Image must be under 200KB. Please choose a smaller file.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (JPG, PNG, etc.)');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error('Please enter a business name');
      return;
    }

    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      let imageData = undefined;
      let imageFilename = undefined;
      if (imageFile && imagePreview) {
        imageData = imagePreview;
        imageFilename = imageFile.name;
      }

      const response = await fetch('/api/submit-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description || undefined,
          category: formData.category || undefined,
          address: formData.address || undefined,
          phone: formData.phone || undefined,
          email: formData.email || undefined,
          website: formData.website || undefined,
          openingHours: formData.openingHours || undefined,
          imageData,
          imageFilename,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit business');
      }

      setIsSubmitted(true);
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      toast.error('Failed to submit business. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full border border-border p-8 text-center animate-scale-in">
          <div className="h-16 w-16 bg-secondary flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-accent" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
            Business Submitted!
          </h2>
          <p className="text-muted-foreground mb-8">
            Thank you for submitting your business. Our team will review it and
            it will appear in the directory within 2-3 business days.
          </p>
          <div className="space-y-3">
            <Button variant="default" className="w-full" onClick={() => router.push('/directory')}>
              Browse Directory
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  description: '',
                  category: '',
                  address: '',
                  phone: '',
                  email: '',
                  website: '',
                  openingHours: '',
                });
              }}
            >
              Submit Another Business
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const categories: BusinessCategory[] = [
    'shop', 'restaurant', 'cafe', 'pub', 'salon', 'professional', 'trades', 'health', 'other'
  ];

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-racing-green py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
            List Your Business
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Add your shop, restaurant, or service to the Shaftesbury directory. Fill out the form below
            and our team will review your submission within 2-3 business days.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto border border-border animate-fade-up">
          <div className="p-6 md:p-8 border-b border-border">
            <h2 className="font-display text-2xl font-semibold">Business Details</h2>
            <p className="text-muted-foreground mt-1">
              Only the business name is required — add as much or as little detail as you like
            </p>
          </div>
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Business Name *</Label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="e.g., The Gold Hill Gallery"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    maxLength={100}
                    className="pl-10 rounded-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell people about your business..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  maxLength={1000}
                  className="rounded-none"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange('category', value)}
                >
                  <SelectTrigger className="rounded-none">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {businessCategoryLabels[cat]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    placeholder="e.g., 12 High Street, Shaftesbury SP7 8JE"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="pl-10 rounded-none"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="e.g., 01747 123456"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="pl-10 rounded-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="pl-10 rounded-none"
                    />
                  </div>
                </div>
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://..."
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    className="pl-10 rounded-none"
                  />
                </div>
              </div>

              {/* Opening Hours */}
              <div className="space-y-2">
                <Label htmlFor="openingHours">Opening Hours</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="openingHours"
                    placeholder="e.g., Mon-Fri 9am-5pm&#10;Sat 10am-4pm&#10;Sun Closed"
                    rows={3}
                    value={formData.openingHours}
                    onChange={(e) => handleChange('openingHours', e.target.value)}
                    className="pl-10 rounded-none"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Business Image</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Upload a photo of your business (max 200KB, JPG or PNG)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                {!imagePreview ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-border hover:border-accent transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <ImagePlus className="h-8 w-8" />
                    <span className="text-sm">Click to upload image</span>
                  </button>
                ) : (
                  <div className="relative w-full h-48">
                    <img
                      src={imagePreview}
                      alt="Business preview"
                      className="w-full h-full object-cover border border-border"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-background/90 border border-border hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="pt-6">
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full gap-2 uppercase tracking-wide"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Business for Review
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  By submitting, you confirm that you are the owner or an authorised
                  representative of this business.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SubmitBusinessForm;
