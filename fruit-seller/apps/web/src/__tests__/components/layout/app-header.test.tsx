import { render } from '@testing-library/react';
import AppHeader from '@/components/layout/app-header';
import CartContextProvider from '@/hooks/use-cart';

describe('AppHeader', () => {
    it('should match snapshot', () => {
        const { container } = render(
            <CartContextProvider>
                <AppHeader />
            </CartContextProvider>
        );
        expect(container).toMatchSnapshot();
    });
});
