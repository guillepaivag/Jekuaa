<template>
    <!-- https://vuetifyjs.com/en/components/data-tables/#crud-actions -->

    <div>
        <div v-if="loadingUsers">
            Cargando usuarios..
        </div>
        <div v-else>

            <v-simple-table dense>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">
                        UID
                        </th>
                        <th class="text-left">
                        Correo
                        </th>
                        <th class="text-left">
                        Usuario
                        </th>
                        <th class="text-left">
                        Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="(userData, index) in usersDataList"
                        :key="index"
                    >
                        <td>{{ userData.uid }}</td>
                        <td>{{ userData.correo }}</td>
                        <td>{{ userData.nombreUsuario }}</td>
                        <td>
                        <v-btn
                            class="ma-2"
                            outlined
                            color="#683bce"
                            block
                            v-on:click="userView(userData.uid)"
                            :to="`/admin/usuarios/${userData.uid}`"
                        >
                            Ver datos
                        </v-btn>
                        <v-btn
                            class="ma-2"
                            outlined
                            color="green darken-1"
                            block
                            v-on:click="userEditView(userData.uid)"
                            :to="`/admin/usuarios/${userData.uid}/editar`"
                        >
                            Editar usuario
                        </v-btn>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <v-btn block v-if="moreDataList" color="#683bce" outlined v-on:click="pagination()" class="mt-5">
                Mostrar más datos
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'userListForAdmin',
    middleware: 'check-adminTeam',
    data() {
        return {
            usersDataList: this.usersData,
            lastDocumentList: this.lastDocument,
            moreDataList: true
        }
    },
    props: {
        limit: Number,
        filtracion: Function,

        loadingUsers: Boolean,
        usersData: Array,
        lastDocument: Object,
        dataFilter: Object
    },
    methods: {
        userView(uid){
            // alert('Vista de datos - UID: ' + uid)
        },
        userEditView(uid){
            // alert('Edición de datos - UID: ' + uid)
        },
        async pagination(){

            try {
                const db = this.$firebase.firestore()

                let next = db.collection('Usuarios')

                next = this.filtracion(next, this.dataFilter)
                
                next = next.startAfter(this.lastDocumentList).limit(this.limit);

                const snapshot = await next.get();

                if(snapshot.size > 0) {
                    snapshot.forEach(snap => {
                        this.usersDataList.push(snap.data())
                    })
                    
                    this.lastDocumentList = snapshot.docs[snapshot.docs.length - 1];
                } else {
                    this.moreDataList = false
                }
            } catch (error) {
                console.log('error', error)

            } finally {
                console.log('this.moreData', this.moreData)
                console.log('this.moreDataList', this.moreDataList)
            }

        },
    },
    mounted() {},
    watch: {
        usersData() {
            this.usersDataList = this.usersData
            this.moreDataList = this.usersData.length > 0
        },
        lastDocument() {
            this.lastDocumentList = this.lastDocument
        },
        dataFilter() {
            this.usersDataList = []
            this.usersDataList = this.usersData
        }
    }
}
</script>

<style>

</style>