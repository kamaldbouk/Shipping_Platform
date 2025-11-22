import { authAPI, shipmentAPI } from './queries';

// Test function to verify all API endpoints
export const testAPIs = async () => {
  try {
    console.log('=== Testing Auth API ===');

    // Test register
    console.log('Testing register...');
    const registerRes = await authAPI.register('Test User', 'test@example.com', 'password123');
    console.log('Register response:', registerRes.data);

    // Test login
    console.log('\nTesting login...');
    const loginRes = await authAPI.login('test@example.com', 'password123');
    console.log('Login response:', loginRes.data);

    const token = loginRes.data.token;
    localStorage.setItem('token', token);

    // Test create shipment
    console.log('\n=== Testing Shipment API ===');
    console.log('Testing create shipment...');
    const createRes = await shipmentAPI.createShipment(
      'John Doe',
      '+1-555-123-4567',
      'New York, USA'
    );
    console.log('Create shipment response:', createRes.data);

    const shipmentId = createRes.data.shipment.id;

    // Test get all shipments
    console.log('\nTesting get all shipments...');
    const getAllRes = await shipmentAPI.getShipments();
    console.log('Get all shipments response:', getAllRes.data);

    // Test get shipment by ID
    console.log('\nTesting get shipment by ID...');
    const getByIdRes = await shipmentAPI.getShipmentById(shipmentId);
    console.log('Get shipment by ID response:', getByIdRes.data);

    // Test update shipment
    console.log('\nTesting update shipment...');
    const updateRes = await shipmentAPI.updateShipment(shipmentId, {
      status: 'IN_TRANSIT'
    });
    console.log('Update shipment response:', updateRes.data);

    // Test get with filter
    console.log('\nTesting get with status filter...');
    const filterRes = await shipmentAPI.getShipments('IN_TRANSIT');
    console.log('Get filtered shipments response:', filterRes.data);

    console.log('\n✅ All tests passed!');
  } catch (error: any) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
};

// Run tests if this file is executed directly
if (typeof window !== 'undefined') {
  (window as any).testAPIs = testAPIs;
}
