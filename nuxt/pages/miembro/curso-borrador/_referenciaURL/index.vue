<template>
    <div v-if="datosCurso">
        <FormularioCurso :datosCursoProp="datosCurso" />
    </div>
</template>

<script>
import { fb } from '@/plugins/firebase'
import FormularioCurso from '@/components/cursos-borrador/miembro/FormularioCurso'

export default {
    name: 'datos-curso',
    data() {
        return {
            datosCurso: null,
        }
    },
    components: {
        FormularioCurso
    },
    async mounted() {
        const snapshotCurso = await fb.firestore()
        .collection('CursosBorrador').where('referenciaURL', '==', this.$route.params.referenciaURL).limit(1)
        .get()

        if (snapshotCurso.empty) this.$router.push('/miembro/cursos/mis-cursos/borrador')

        const doc = snapshotCurso.docs[0]

        this.datosCurso = doc.data()
    },
    beforeDestroy() {
        // alert('Hay cambios para guardar!')
    },
}
</script>

<style>

</style>