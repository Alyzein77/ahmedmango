-- Create storage bucket for admin uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('admin-uploads', 'admin-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated admins to upload files
CREATE POLICY "Admins can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'admin-uploads' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow authenticated admins to update their uploads
CREATE POLICY "Admins can update images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'admin-uploads' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow authenticated admins to delete uploads
CREATE POLICY "Admins can delete images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'admin-uploads' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow public read access to uploaded images
CREATE POLICY "Public can view admin uploads"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'admin-uploads');