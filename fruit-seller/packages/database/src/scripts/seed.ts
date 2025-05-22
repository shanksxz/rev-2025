import { db, client } from "../database";
import { categories, products } from "../schema/product";

async function main() {
    console.log("🌱 Seeding database...");

    console.log("🔖 Seeding categories...");
    const categoriesData = [
        {
            name: "Fruits",
            description: "Fresh fruits from local and international farms",
        },
        {
            name: "Vegetables",
            description: "Organic vegetables sourced from trusted farmers",
        },
        {
            name: "Berries",
            description: "Sweet and juicy berries for your healthy diet",
        },
        {
            name: "Tropical",
            description: "Exotic tropical fruits from around the world",
        },
        {
            name: "Citrus",
            description: "Tangy and refreshing citrus fruits",
        },
    ];

    const insertedCategories = await db
        .insert(categories)
        .values(categoriesData)
        .returning();
    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    const categoryMap = insertedCategories.reduce(
        (acc, category) => {
            acc[category.name] = category.id;
            return acc;
        },
        {} as Record<string, string>
    );

    console.log("🍎 Seeding products...");
    const productsData = [
        {
            name: "Apple",
            description: "Fresh and crisp apples from local orchards",
            price: 1.99,
            image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            stock: 100,
            categoryId: categoryMap["Fruits"],
        },
        {
            name: "Banana",
            description: "Sweet and nutritious bananas",
            price: 0.99,
            image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
            stock: 150,
            categoryId: categoryMap["Fruits"],
        },
        {
            name: "Orange",
            description: "Juicy oranges rich in vitamin C",
            price: 2.49,
            image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            stock: 75,
            categoryId: categoryMap["Citrus"],
        },
        {
            name: "Strawberry",
            description: "Sweet and juicy strawberries",
            price: 3.99,
            image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1460&q=80",
            stock: 50,
            categoryId: categoryMap["Berries"],
        },
        {
            name: "Blueberry",
            description: "Antioxidant-rich blueberries",
            price: 4.99,
            image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
            stock: 30,
            categoryId: categoryMap["Berries"],
        },
        {
            name: "Mango",
            description: "Sweet and tropical mangoes",
            price: 2.99,
            image: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            stock: 40,
            categoryId: categoryMap["Tropical"],
        },
        {
            name: "Pineapple",
            description: "Tropical pineapples with sweet and tangy flavor",
            price: 3.49,
            image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            stock: 25,
            categoryId: categoryMap["Tropical"],
        },
        {
            name: "Carrot",
            description: "Fresh and crunchy carrots",
            price: 1.49,
            image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            stock: 80,
            categoryId: categoryMap["Vegetables"],
        },
        {
            name: "Broccoli",
            description: "Nutritious green broccoli",
            price: 2.29,
            image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            stock: 60,
            categoryId: categoryMap["Vegetables"],
        },
        {
            name: "Lemon",
            description: "Zesty lemons for cooking and beverages",
            price: 1.29,
            image: "https://images.unsplash.com/photo-1590502593747-42a996133562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            stock: 90,
            categoryId: categoryMap["Citrus"],
        },
    ];

    const insertedProducts = await db
        .insert(products)
        .values(productsData)
        .returning();
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    console.log("✅ Seeding completed successfully!");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
  // Seed products
        await client.end();
    });
