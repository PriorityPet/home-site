import { supabase } from '../../../../infrastructure/config/supabase/supabase-client';
import nookies from 'nookies';
import { OrdersFailure, ordersFailuresEnum } from '../../../../domain/core/failures/orders/ordersFailure';

export default interface IOrdersRepository {
  getOrders(): Promise<Array<any> | OrdersFailure>;
}

export class OrdersRepository implements IOrdersRepository {

    async getOrders(): Promise<Array<any> | OrdersFailure> {
        try {

            const creationDBresponse = await supabase.from("transacciones").select("*")
            
            return creationDBresponse.data ?? [];
        } catch (error) {
            const exception = error as any;
            return new OrdersFailure(ordersFailuresEnum.tooManyRequest);
        }
    }

}