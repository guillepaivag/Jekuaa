<template>
    <div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            rol: {
                texto: 'Todos',
                codigo: null
            },
            seccion: [],
            instructor: {
                texto: 'Todos', 
                codigo: null
            },
            jekuaaPremium: {
                texto: 'Todos',
                codigo: null
            },
            opcionesRoles: [
                { texto: 'Todos', codigo: null },
                { texto: 'Propietario', codigo: 'propietario' },
                { texto: 'MiembroJekuaa', codigo: 'miembroJekuaa' },
                { texto: 'Estudiante', codigo: 'estudiante' }
            ],
            opcionesSecciones: [
                { texto: 'Informática', codigo: 'informatica' },
                { texto: 'Matemática', codigo: 'matematica' }
            ],
            opcionesInstructores: [
                { texto: 'Todos', codigo: null },
                { texto: 'Instructor', codigo: true },
                { texto: 'Todos', codigo: false },
            ],
            opcionesJekuaaPremium: [
                { texto: 'Todos', codigo: null },
                { texto: 'Basico', codigo: 'basico' }
            ],
        }
    },
}
</script>

<style>

</style>