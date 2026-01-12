-- Trim trailing/leading spaces from all category values
UPDATE products SET category = TRIM(category);

-- Standardize any variant spellings
UPDATE products SET category = 'شوكولاتة' WHERE category = 'شوكولاته' OR category = 'شوكلاتة';