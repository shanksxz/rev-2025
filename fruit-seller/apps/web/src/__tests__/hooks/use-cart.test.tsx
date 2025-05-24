import { ProductType } from "@repo/database"
import CartContextProvider, { useCart } from "@/hooks/use-cart"
import { render, screen, fireEvent } from "@testing-library/react"

const product: ProductType = {
    id: "1",
    name: "Product 1",
    description: "Product 1 description",
    price: 100,
    stock: 10,
    image: "product1.jpg",
    categoryId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
}

const cartItems = {
    id: "1",
    product,
    quantity: 1,
}

function TestComponent() {
    const { items, addItem, removeItem, clearCart, total, subtotal, tax, shipping } = useCart();
    return (
        <div>
            <div data-testid="cart-length">{items.length}</div>
            <div data-testid="cart-items">{JSON.stringify(items)}</div>
            <div data-testid="cart-total">{total}</div>
            <div data-testid="cart-subtotal">{subtotal}</div>
            <div data-testid="cart-tax">{tax}</div>
            <div data-testid="cart-shipping">{shipping}</div>
            <button data-testid="add-item" onClick={() => addItem(cartItems)}>Add Item</button>
            <button data-testid="remove-item" onClick={() => removeItem(cartItems)}>Remove Item</button>
            <button data-testid="clear-cart" onClick={() => clearCart()}>Clear Cart</button>
        </div>
    );
}

describe("Cart Context", () => {
    beforeEach(() => {
        render(<CartContextProvider>
            <TestComponent />
        </CartContextProvider>)
    });
    it("should return the initial cart", () => {
        expect(screen.getByTestId("cart-length").textContent).toBe("0");
    });
    it("should add an item to the cart", () => {
        fireEvent.click(screen.getByTestId("add-item"));
        expect(screen.getByTestId("cart-length").textContent).toBe("1");
    });
    it("should remove an item from the cart", () => {
        fireEvent.click(screen.getByTestId("remove-item"));
        expect(screen.getByTestId("cart-length").textContent).toBe("0");
    });
    it("should clear the cart", () => {
        fireEvent.click(screen.getByTestId("clear-cart"));
    });
});


