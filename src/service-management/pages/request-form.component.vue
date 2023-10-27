<template>
  <div>
    <h1>Request Form</h1>
    <form @submit.prevent="submitRequest">
      <div class="form-group">
        <label for="area">Area:</label>
        <input type="text" id="area" v-model="request.area" />
      </div>

      <div class="form-group">
        <label for="budget">Estimated Budget:</label>
        <select id="budget" v-model="request.budget">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div class="form-group">
        <label for="category">Category:</label>
        <select id="category" v-model="request.category">
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </div>

      <div class="form-group">
        <label for="location">Location:</label>
        <input type="text" id="location" v-model="request.location" />
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="request.description"></textarea>
      </div>

      <div class="form-group">
        <label for="file">Add File:</label>
        <input type="file" id="file" />
      </div>

      <button type="submit">Publish</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Request-Form-Page',
  data() {
    return {
      request: {
        area: '',
        budget: 'low',
        category: 'category1',
        location: '',
        description: ''
      }
    }
  },
  methods: {
    submitRequest() {
      // Aquí puedes manejar la lógica para enviar el formulario
      console.log('Form submitted with data:', this.request)
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type='text'],
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #02aa8b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
