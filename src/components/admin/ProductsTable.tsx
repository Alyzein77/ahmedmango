import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductsTable = ({ products, onEdit, onDelete }: ProductsTableProps) => {
  if (products.length === 0) {
    return (
      <div className="bg-card rounded-xl p-12 text-center border border-border">
        <p className="text-muted-foreground font-tajawal text-lg">
          لا توجد منتجات بعد
        </p>
        <p className="text-muted-foreground font-tajawal text-sm mt-2">
          اضغط على "إضافة منتج جديد" للبدء
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-right font-tajawal font-semibold">الترتيب</TableHead>
            <TableHead className="text-right font-tajawal font-semibold">الاسم</TableHead>
            <TableHead className="text-right font-tajawal font-semibold">العلامة التجارية</TableHead>
            <TableHead className="text-right font-tajawal font-semibold">الفئة</TableHead>
            <TableHead className="text-right font-tajawal font-semibold">التقييم</TableHead>
            <TableHead className="text-right font-tajawal font-semibold">الحكم</TableHead>
            <TableHead className="text-right font-tajawal font-semibold">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-muted/30">
              <TableCell className="font-tajawal font-bold text-center">
                {product.ranking}
              </TableCell>
              <TableCell className="font-tajawal font-medium">
                <div className="flex items-center gap-3">
                  {product.thumbnail_url && (
                    <img
                      src={product.thumbnail_url}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  )}
                  <span>{product.name}</span>
                </div>
              </TableCell>
              <TableCell className="font-tajawal text-muted-foreground">
                {product.brand || "-"}
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="font-tajawal">
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="font-bold text-primary font-tajawal">
                  {product.rating}/10
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    product.verdict === "2استكا"
                      ? "bg-primary text-primary-foreground font-tajawal"
                      : "bg-accent text-accent-foreground font-tajawal"
                  }
                >
                  {product.verdict === "2استكا" ? "✔️" : "✖️"} {product.verdict}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(product)}
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(product.id)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
