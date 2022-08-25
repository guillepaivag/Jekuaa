<template>
    <div v-if="datosCurso">
        <FormularioCurso 
            :datosCursoProp="datosCurso"
            @actualizacionCurso="actualizacionCurso($event)"
        />
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'
import FormularioCurso from '@/components/cursos-borrador/miembro/FormularioCurso'

export default {
    name: 'datos-curso',
    layout: 'miembro',
    middleware: 'esInstructor',
    data() {
        return {
            datosCurso: null,
        }
    },
    components: {
        FormularioCurso
    },
    methods: {
        actualizacionCurso(datosActualizados = { datosCurso }) {

            if (datosActualizados.datosCurso.titulo) this.datosCurso.titulo = datosActualizados.datosCurso.titulo

            if (datosActualizados.datosCurso.descripcion) this.datosCurso.descripcion = datosActualizados.datosCurso.descripcion

            if (datosActualizados.datosCurso.requisitos) this.datosCurso.requisitos = datosActualizados.datosCurso.requisitos

            if (datosActualizados.datosCurso.objetivos) this.datosCurso.objetivos = datosActualizados.datosCurso.objetivos

            if (datosActualizados.datosCurso.nivel) this.datosCurso.nivel = datosActualizados.datosCurso.nivel

            if (datosActualizados.datosCurso.seccion) this.datosCurso.seccion = datosActualizados.datosCurso.seccion

            if (datosActualizados.datosCurso.categorias) this.datosCurso.categorias = datosActualizados.datosCurso.categorias

            if (datosActualizados.datosCurso.idioma) this.datosCurso.idioma = datosActualizados.datosCurso.idioma

        },
    },
    async mounted() {
        const doc = await fb.firestore()
        .collection('CursosBorrador').doc(this.$route.params.uidCurso)
        .get()

        if (!doc.exists) this.$router.push('/miembro/cursos/mis-cursos/borrador')

        this.datosCurso = doc.data()
    },
    beforeDestroy() {
        // alert('Hay cambios para guardar!')
    },
}
</script>

<style>

</style>