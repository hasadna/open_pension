import axios from 'axios';

describe('Testing health of the services', function () {

  const services = {
    backoffice: 'http://localhost:1000',
    backofficeBackend: 'http://localhost:2000',
    front: 'http://localhost:3000',
    monthly: 'http://localhost:4000',
    storage: 'http://localhost:7000',
  };

  const verifyServerRuns = async (service, isGraphql = false) => {
    let data;
    if (isGraphql) {
      data = await axios.post(services[service], {
        query: `query {channels {ID}}`,
      });
    } else {
      data = await axios.get(services[service]);
    }
    expect(data.status).toBe(200);
  };

  it('Testing the backoffice', async () => {
    await verifyServerRuns('backoffice');
  });

  it('Testing the backoffice backend', async () => {
    await verifyServerRuns('storage');
  });

  it('Testing the front', async () => {
    await verifyServerRuns('front');
  });

  it('Testing the monthly', async () => {
    await verifyServerRuns('monthly', true);
  });

  it('Testing the storage', async () => {
    await verifyServerRuns('storage');
  });
});
