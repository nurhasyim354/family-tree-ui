import { PERSON_URL, SPOUSE_URL, GET_MOTHERS_URL } from '../constants'

class ApiHandler {
  static async createPerson(person) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person)
    };
    const response = await fetch(PERSON_URL, requestOptions);
    return response.json();;
  }

  static async updatePerson(id, person) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(person)
    };
    const response = await fetch(`${PERSON_URL}/${id}`, requestOptions);
    return response.json();;
  }

  static async createSpouse(spouse) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spouse)
    };
    return fetch(SPOUSE_URL, requestOptions);
  }



  static async getMothers(){
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    const result = await fetch(GET_MOTHERS_URL, requestOptions);
    return result.json();
  }

  static async getPerson(id){
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    const result = await fetch(`${PERSON_URL}/${id}`, requestOptions);
    return result.json();
  }
}

export default ApiHandler;