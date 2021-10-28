<template>
  <div>
    
  </div>
</template>

<script>
export default {
  name: 'AdminIndex',
  layout: 'admin',
  middleware: 'esMiembroJekuaa',
  data () {
    return {
      adminElements: [
        {
          color: '#683bce',
          title: 'Usuarios',
          description: 'Administra a los usuarios.',
          to: '/miembro-jekuaa/usuarios'
        },
        {
          color: '#ff1d89',
          title: 'Blog',
          description: 'Administra los blogs de Jekuaa.',
          to: '/miembro-jekuaa/blog'
        },
        {
          color: '#683bce',
          title: 'Cursos',
          description: 'Administra los cursos de Jekuaa.',
          to: '/miembro-jekuaa/cursos'
        }
      ]
    }
  }
}
</script>

<style>

</style>
