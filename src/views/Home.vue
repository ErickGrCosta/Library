<template>
  <div>
    <section class="hero is-link">
      <div class="hero-body">
        <p class="title">
          Treinamento
        </p>
        <p class="subtitle">
          Vue + Vite
        </p>
      </div>
    </section>
    <div class="is-flex is-flex-direction-column is-align-items-center mt-6">
      <!-- <CustomInput 
        v-model="state.inputText"
        title="Título"
        :use-validation="true"
      >
      </CustomInput> -->
      <div class="is-flex-inline is-align-content-center is-justify-content-center">
        <router-link :to="{name:'Books'}"></router-link>

        <div class="modal" :class="{'is-active' : state.openModal}">
          <div class="modal-background"  @click="state.openModal = false"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Modal title</p>
              <button class="delete" @click="state.openModal = false" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
              <label for="title">Título:</label>
              <input class="input mb-2" v-model="state.formFields.title" type="text" id="title"/>
      
              <label for="subtitle">Subtítulo</label>
              <input class="input mb-2" v-model="state.formFields.subtitle" type="text" id="subtitle"/>
      
              <label for="observation">Observação</label>
              <input class="input mb-2" v-model="state.formFields.observation" type="text" id="observation"/>
      
              <label for="total_pages">Total de páginas</label>
              <input class="input mb-2" v-model="state.formFields.total_pages" type="number" id="total_pages"/>
      
              <label class="label" for="file">Capa do Livro</label>
              <div class="file has-name is-fullwidth mb-2">
                <label class="file-label">
                  <input @change="(event) => uploadImage(event)" class="file-input" type="file" name="resume">
                  <span class="file-cta">
                    <span class="file-icon">
                      <icon icon="cloud-upload"></icon>
                    </span>
                    <span class="file-label">
                      Escolha um arquivo.
                    </span>
                  </span>
                  <span class="file-name">
                  {{state.formFields.image_name ? state.formFields.image_name : 'Nenhum arquivo selecionado.' }} 
                  </span>
                </label>
              </div>

              <label for="cover_type">Tipo de capa</label>
              <div class="select is-fullwidth mb-2">
                <select v-model="state.formFields.cover_type" id="cover_type"  name="cover_type">
                  <option value="" hidden selected>Selecione</option>
                  <option value="simple">Simples</option>
                  <option value="thick">Dura</option>
                </select>
              </div>
              
              <label for="available">Disponível</label>
              <div class="select is-fullwidth mb-2">
                <select v-model="state.formFields.available" id="available"  name="available">
                  <option value="" hidden selected>Selecione</option>
                  <option :value="true">Disponível</option>
                  <option :value="false">Indisponível</option>
                </select>
              </div>

            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" @click="state.isCreateMode ? createBook() : updateBook(state.bookId)">Cadastrar</button>
              <button class="button" @click="state.openModal = false">Cancelar</button>
            </footer>
          </div>
        </div>

          <div class="input-size">

          </div>

          <button class="button" @click="[state.openModal = true, resetFields(), state.isCreateMode = true]">
            Cadastrar
          </button>

        <p class="information-title">Clique para saber mais informações:</p>
        <div v-for="book in state.bookInformation" :key="book.id">
          <div>
            <button class="button is-link mr-1" @click="state.bookValue = book.id" type="button">{{ book.title }}</button>
            <button class="button is-info is-small mr-1" @click="[updateBookModal(book.id), state.isCreateMode = false, state.bookId = book.id]" type="button">{{ 'Editar' }}</button>
            <button class="button is-danger is-small" @click="deleteBook(book.id)" type="button">{{ 'Deletar' }}</button>
          </div>
        </div>
        <div>
          <p>Livro selecionado: {{ state.selectedBook.title }}</p>
          <p>Subtítulo: {{ state.selectedBook.subtitle }}</p>
          <p>Observação: {{ state.selectedBook.observation }}</p> 
          <p>Tipo de capa: {{ state.selectedBook.cover_type == 'simple' ? 'Simples' : 'Dura' }}</p>
          <p>Total de páginas: {{ state.selectedBook.total_pages }}</p>
          <p>Disponibilidade: {{ state.selectedBook.available ? 'Disponível' : 'Indisponível' }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const props = defineProps({
  modelValue: {
    default: '',
  },
})

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true,
  headers: {
    Accept: "application/json",
    'Content-Type': "application/json",
  },
});

const state = reactive({
  inputText: '',
  hasText: false,
  bookValue: 0,
  bookId: 0,
  bookInformation: [],
  selectedBook: '',
  openModal: false,
  isCreateMode: true,
  formFields: {
    title: '',
    subtitle: '',
    observation: '',
    total_pages: 0, 
    cover_type: '', 
    available: false,
    image_file: '',
    image_name: '',
  }
})

function uploadImage(event) {
  state.formFields.image_file = event.target.files[0]
  state.formFields.image_name = event.target.files[0].name
}

function resetFields() {
  state.formFields.title = '',
  state.formFields.subtitle = '',
  state.formFields.observation = '',
  state.formFields.total_pages = 0, 
  state.formFields.cover_type = '', 
  state.formFields.available = false
  state.formFields.image_file = ''
  state.formFields.image_name = ''
}

function createBook() {
  const newBookDate = {
    title: state.formFields.title,
    subtitle: state.formFields.subtitle,
    observation: state.formFields.observation,
    total_pages: state.formFields.total_pages, 
    cover_type: state.formFields.cover_type, 
    available: state.formFields.available,
    image: state.formFields.image_file,
  }
  console.log(newBookDate.image);
  Swal.fire({
  title: 'Desejar salvar este livro?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Salvar',
  denyButtonText: `Não salvar`, 
  })
  .then((result) => {
    if (result.isConfirmed) {
        instance.post('books/', newBookDate)
        .then((res) => {
          if (res.status !== 200) {
            Swal.fire('Criação não realizada', 'Erro no cadastro', 'error')
            .then(() => {
              state.openModal = false
              resetFields()
            })
          } else {
            updateBooksList()
            Swal.fire('Salvo!', '', 'success')
            .then(() => {
              state.openModal = false
              resetFields()
            })
            }
        })
      
    } else if (result.isDenied) {
      Swal.fire('O livro não foi salvo', '', 'info')
      .then(() => 
        state.openModal = false
      )
    }
  })
  .catch((err) => {
    console.log(err)
  })
}

function updateBookModal(id) {
  instance.get(`books/${id}/`)
  .then((res) => {
    const data = res.data
    state.formFields.title = data.title,
    state.formFields.subtitle = data.subtitle,
    state.formFields.observation = data.observation,
    state.formFields.total_pages = data.total_pages, 
    state.formFields.cover_type = data.cover_type, 
    state.formFields.available = data.available
    state.openModal = true
  })
}

function updateBook(id) {
  const newEditedBookDate = {
    title: state.formFields.title,
    subtitle: state.formFields.subtitle,
    observation: state.formFields.observation,
    total_pages: state.formFields.total_pages, 
    cover_type: state.formFields.cover_type, 
    available: state.formFields.available
  }
  Swal.fire({
  title: 'Desejar salvar a edição deste livro?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Salvar',
  denyButtonText: `Não salvar`,
  })
  .then((result) => {
    if (result.isConfirmed) {
      instance.patch(`books/${id}/`, newEditedBookDate)
      .then((res) => {
        console.log(res)
        if (res.status !== 200) {
          Swal.fire('Edição não realizada', 'Erro no cadastro', 'error')
          .then(() => {
            state.openModal = false
            resetFields()
          })
        } else {
          updateBooksList()
          Swal.fire('Salvo!', '', 'success')
          .then(() => {
            state.openModal = false
            resetFields()
          })
          }
      })
      
    } else if (result.isDenied) {
      Swal.fire('Edição não realizada', '', 'info')
      .then(() => 
        state.openModal = false
      )
    }
  })
  .catch((err) => {
    console.log(err)
  })
}

function deleteBook(id) {
  Swal.fire({
    title: 'Tem certeza?',
    text: "Você não poderá recuperar o que for deletado.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: "Cancelar",
    confirmButtonText: 'Sim, deletar!'
  }).then((result) => {
      if (result.isConfirmed) {
        instance.delete(`books/${id}/`)
        Swal.fire('Excluído!', 'O livro foi deletado', 'success')
        .then(() =>
          updateBooksList()
        )
      } else if (result.isDenied) {
        Swal.fire('Falha na exclusão!', '', 'error')
      }
  })
}

function updateBooksList(){
  instance.get('books/')
  .then((res) => {
    state.bookInformation = res.data.reverse()
  })
}

onMounted(() => {
  instance.get('books/')
  .then((res) => {
    state.bookInformation = res.data.reverse()
  })
})

watch(
  () => state.bookValue,
  (newValue) => {
    instance.get(`books/${newValue}/`)
    .then((res) => 
      state.selectedBook = res.data
    )
    .catch((err) => {
      console.log(err)
    })
  }
)

</script>

<style scoped>
.information-title {
  font-weight: bold;
}
p {
  font-weight: 500;
}

</style>



<!-- Em vez de ter botões fixos com os livros criados, criar botões dinâmicos de acordo com os dados que já estão cadastrados. -->
<!-- Resumindo, fazer crud completo dos livros. -->


<!-- Colocar um delay na função de atualizar de 1,5 segundos usando a biblioteca time do python. User a função time.sleep() para fazer esse delay -->
<!-- O objetivo é simular uma requisição lenta. Para tratar isso no front, fazer um loader para indicar para o usuário que a requisição está sendo
processada, e ao mesmo tempo desabilitar os botões, para impedir que ele clique várias vezes. Ao fim, o loader some e os botões são habilitados de novo, e uma mensagem
de sucesso é mostrada.
Vai usar API Rest ao invés do form - POST, PATCH, DELETE, PATCH -->
