import { getListService } from "../services/getlist.service";

describe('Pruebas en getlist.service', () => { 
    test('getlist debe retornar una array con 100 objetos', () => { 
        // ATC
        const list = getListService();
        // Observar comportamiento
        expect(list.length).toBe(100);
    });



});