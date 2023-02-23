import { OrdersRepository } from './../../../infrastructure/repositories/account/orders/ordersRepository';
import { OrdersFailure } from './../../core/failures/orders/ordersFailure';

export default class OrdersUseCase {
    private _repository: OrdersRepository = new OrdersRepository();

    async getOrders(): Promise<Array<any>> {
        try {

            const response = await this._repository.getOrders();

            if (response instanceof OrdersFailure) throw response;

            return response;
        } catch (error) {
        throw error;
        }
    }

}
