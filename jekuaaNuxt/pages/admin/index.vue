<template>
  <div>
    <v-container class="mt-4">
      <v-row dense>
        <v-col
          v-for="(adminElement, i) in adminElements"
          :key="i"
          cols="12"
        >
          <v-card
            :color="adminElement.color"
            dark
          >
            <v-card-title class="text-h5">
              {{ adminElement.title }}
            </v-card-title>

            <v-card-subtitle>
              {{ adminElement.description }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn text :to="adminElement.to">
                Comenzar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AdminIndex',
  middleware: 'esUsuarioTeamJekuaa',
  data () {
    return {
      adminElements: [
        {
          color: '#683bce',
          title: 'Usuarios',
          description: 'Administra a los usuarios.',
          to: '/admin/usuarios'
        },
        {
          color: '#ff1d89',
          title: 'Blog',
          description: 'Administra los blogs de Jekuaa.',
          to: '/admin/blog'
        },
        {
          color: '#683bce',
          title: 'Cursos',
          description: 'Administra los cursos de Jekuaa.',
          to: '/admin/cursos'
        }
      ]
    }
  }
}
</script>

<style>

</style>
