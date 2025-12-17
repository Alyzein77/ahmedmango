import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProductsTable from "./ProductsTable";
import ProductFormDialog from "./ProductFormDialog";
import { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

const ProductsManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("ranking", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل المنتجات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (productData: ProductInsert) => {
    try {
      const { error } = await supabase.from("products").insert([productData]);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تمت إضافة المنتج بنجاح",
      });
      fetchProducts();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة المنتج",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async (id: string, productData: ProductUpdate) => {
    try {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم تحديث المنتج بنجاح",
      });
      fetchProducts();
      setDialogOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث المنتج",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: "تم حذف المنتج بنجاح",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "خطأ",
        description: "فشل في حذف المنتج",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingProduct(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-tajawal">
            لوحة المنتجات
          </h1>
          <p className="text-muted-foreground font-tajawal">
            إدارة جميع المنتجات المراجعة
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-tajawal"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة منتج جديد
        </Button>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <ProductsTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDeleteProduct}
        />
      )}

      {/* Product Form Dialog */}
      <ProductFormDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        product={editingProduct}
        onSubmit={editingProduct 
          ? (data) => handleUpdateProduct(editingProduct.id, data)
          : handleAddProduct
        }
      />
    </div>
  );
};

export default ProductsManager;
