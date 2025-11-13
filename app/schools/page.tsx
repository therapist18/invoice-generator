'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { PlusCircle, MoreHorizontal, Pen, Trash2 } from 'lucide-react'

// Import your configured Supabase client
import { supabase } from '@/lib/supabase'

// UI Components from shadcn/ui
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

// The School type MUST match your Supabase table columns exactly
interface School {
  id: string;
  name: string;
  logo_url: string | null;
  contact_person: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  notes: string | null;
}

// Validation schema for the school form using Zod
const schoolSchema = z.object({
  name: z.string().min(2, { message: 'School name must be at least 2 characters long.' }),
  contact_person: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email({ message: "Invalid email address." }).optional().or(z.literal('')).nullable(),
  address: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
})

type SchoolFormData = z.infer<typeof schoolSchema>


// --- Main Page Component ---
const SchoolsPage = () => {
  const { toast } = useToast()
  
  // State for data, loading, and dialogs
  const [schools, setSchools] = useState<School[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)

  const [isAddOpen, setAddOpen] = useState(false)
  const [isEditOpen, setEditOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  // Fetch initial data using Supabase
  const loadSchools = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setSchools(data || []);
    } catch (error: any) {
      toast({ title: "Error fetching schools", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadSchools();
  }, [loadSchools]);

  // Handlers for CRUD operations
  const handleAdd = async (formData: SchoolFormData) => {
    try {
      const { error } = await supabase.from('schools').insert([formData]);
      if (error) throw error;
      
      toast({ title: "Success", description: "School added successfully." });
      loadSchools(); // Refresh data
      return true; // Indicate success to close dialog
    } catch (error: any) {
      toast({ title: "Error adding school", description: error.message, variant: "destructive" });
      return false;
    }
  };
  
  const handleUpdate = async (formData: SchoolFormData) => {
    if (!selectedSchool) return false;
    try {
      const { error } = await supabase
        .from('schools')
        .update(formData)
        .eq('id', selectedSchool.id);
      
      if (error) throw error;

      toast({ title: "Success", description: "School updated successfully." });
      loadSchools(); // Refresh data
      return true;
    } catch (error: any) {
      toast({ title: "Error updating school", description: error.message, variant: "destructive" });
      return false;
    }
  };

  const handleDelete = async () => {
    if (!selectedSchool) return;
    try {
      const { error } = await supabase
        .from('schools')
        .delete()
        .eq('id', selectedSchool.id);

      if (error) throw error;
      
      toast({ title: "Success", description: "School deleted successfully." });
      loadSchools(); // Refresh data
      setDeleteOpen(false); // Close dialog on success
    } catch (error: any) {
      toast({ title: "Error deleting school", description: error.message, variant: "destructive" });
    }
  };

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Schools</h1>
          <Button className="ml-auto" size="sm" onClick={() => setAddOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add School
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>School Management</CardTitle>
            <CardDescription>
              A list of all schools from your Supabase database.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading schools...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schools.map((school) => (
                    <TableRow key={school.id}>
                      <TableCell className="font-medium">{school.name}</TableCell>
                      <TableCell>{school.contact_person || 'N/A'}</TableCell>
                      <TableCell>{school.phone || 'N/A'}</TableCell>
                      <TableCell>{school.email || 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => { setSelectedSchool(school); setEditOpen(true); }}>
                              <Pen className="h-4 w-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => { setSelectedSchool(school); setDeleteOpen(true); }} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Dialogs */}
      <AddSchoolDialog isOpen={isAddOpen} onClose={() => setAddOpen(false)} onSave={handleAdd} />
      {selectedSchool && (
        <>
          <EditSchoolDialog isOpen={isEditOpen} onClose={() => setEditOpen(false)} onSave={handleUpdate} school={selectedSchool} />
          <DeleteSchoolDialog isOpen={isDeleteOpen} onClose={() => setDeleteOpen(false)} onDelete={handleDelete} schoolName={selectedSchool.name} />
        </>
      )}
    </>
  );
};

// --- Dialog Components (Re-usable Form Logic) ---

const SchoolForm = ({ form }: { form: ReturnType<typeof useForm<SchoolFormData>> }) => (
  <>
    <FormField control={form.control} name="name" render={({ field }) => (
      <FormItem>
        <FormLabel>School Name</FormLabel>
        <FormControl><Input placeholder="e.g., Green Hills Academy" {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="contact_person" render={({ field }) => (
        <FormItem>
          <FormLabel>Contact Person</FormLabel>
          <FormControl><Input placeholder="e.g., Jane Doe" {...field} value={field.value ?? ''} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="phone" render={({ field }) => (
        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <FormControl><Input placeholder="e.g., 555-1234" {...field} value={field.value ?? ''} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
    <FormField control={form.control} name="email" render={({ field }) => (
        <FormItem>
          <FormLabel>Email Address</FormLabel>
          <FormControl><Input placeholder="e.g., contact@school.edu" {...field} value={field.value ?? ''} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
    <FormField control={form.control} name="address" render={({ field }) => (
        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl><Textarea placeholder="School's physical address" {...field} value={field.value ?? ''} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
  </>
);

const AddSchoolDialog = ({ isOpen, onClose, onSave }: {isOpen: boolean, onClose: () => void, onSave: (data: SchoolFormData) => Promise<boolean>}) => {
  const form = useForm<SchoolFormData>({ resolver: zodResolver(schoolSchema), defaultValues: { name: '', email: '', contact_person: '', phone: '', address: '', notes: '' } });
  
  const onSubmit = async (data: SchoolFormData) => {
    const success = await onSave(data);
    if (success) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>Add New School</DialogTitle><DialogDescription>Fill in the details below.</DialogDescription></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SchoolForm form={form} />
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? 'Saving...' : 'Save School'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const EditSchoolDialog = ({ isOpen, onClose, onSave, school }: {isOpen: boolean, onClose: () => void, onSave: (data: SchoolFormData) => Promise<boolean>, school: School}) => {
  const form = useForm<SchoolFormData>({ resolver: zodResolver(schoolSchema), defaultValues: school });

  useEffect(() => {
    form.reset(school);
  }, [school, form]);
  
  const onSubmit = async (data: SchoolFormData) => {
    const success = await onSave(data);
    if (success) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit School</DialogTitle><DialogDescription>Update the details for {school.name}.</DialogDescription></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SchoolForm form={form} />
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const DeleteSchoolDialog = ({ isOpen, onClose, onDelete, schoolName }: {isOpen: boolean, onClose: () => void, onDelete: () => Promise<void>, schoolName: string}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete();
    // No need to set isDeleting back to false if the dialog closes on success
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>Are you absolutely sure?</DialogTitle><DialogDescription>This action cannot be undone. This will permanently delete the school record for <strong>{schoolName}</strong>.</DialogDescription></DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'Delete'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SchoolsPage;