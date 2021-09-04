<template>
  <div>
    <filterAdminUser 
      :limit="limit"
      :filtracion="filtracion"

      @loadingUsers="setLoadingUsers($event)"
      @usersData="setUsersData($event)"
      @lastDocument="setLastDocument($event)" 
      @dataFilter="setDataFilter($event)" 
    />

    <div class="container">
      
        <userListForAdmin 
          :limit="limit"
          :filtracion="filtracion"

          :loadingUsers="loadingUsers"
          :usersData="usersData"
          :lastDocument="lastDocument"
          :dataFilter="dataFilter"
        />
        
    </div>
  </div>
</template>

<script>
import userListForAdmin from '@/components/lists/admin/User'
import filterAdminUser from "@/components/filter/admin/User";

export default {
  name: "",
  middleware: 'esUsuarioTeamJekuaa',
  components: {
    filterAdminUser,
    userListForAdmin
  },
  data() {
    return {
      // Datos que se recibe del hijo 'filterAdminUser'
      loadingUsers: true,
      usersData: [],
      lastDocument: null,
      dataFilter: null,
      // Datos por defecto del sistema de usuarios
      limit: 1
    };
  },
  methods: {
    setLoadingUsers(loadingUsers) {
      this.loadingUsers = loadingUsers
    },
    setUsersData(usersData) {
      this.usersData = usersData
    },
    setLastDocument(lastDocument) {
      this.lastDocument = lastDocument
    },
    setDataFilter(dataFilter) {
      this.dataFilter = dataFilter
    },
    filtracion(ref, dataFilter) {

      const adminTeam = ['admin', 'subAdmin', 'creadorContenido']

      if(dataFilter.userIdentifier.type && dataFilter.userIdentifier.identifierData) {
          switch (dataFilter.userIdentifier.type) {
          case 'uid':
              ref = ref.where('uid', '==', dataFilter.userIdentifier.identifierData)
              break;

          case 'email':
              ref = ref.where('correo', '==', dataFilter.userIdentifier.identifierData)
              break;

          case 'username':
              ref = ref.where('nombreUsuario', '==', dataFilter.userIdentifier.identifierData)
              break;
          
          default:
              break;
          }
      }

      if(dataFilter.roleCode) {
          console.log('dataFilter.roleCode', dataFilter.roleCode)
          if(!!adminTeam.find(x => x === dataFilter.roleCode)) {
            console.log('dataFilter.seccionCode', dataFilter.seccionCode)
            ref = ref.where('datosRol.seccion', 'array-contains-any', dataFilter.seccionCode)
          }

          ref = ref.where('datosRol.rol', '==', dataFilter.roleCode)
      }

      if(dataFilter.premium) {
          if(dataFilter.tipoPremium || dataFilter.datePremium) {
              if(dataFilter.tipoPremium) {
                  // PARA SOLO TIPO PREMIUM QUE SEA SOLO UNO
                  ref = ref.where('datosPlan.tipoPremium', '==', dataFilter.tipoPremium)
              }
              if (dataFilter.datePremium) {
                  // PARA TODOS LOS TIPO PREMIUM DE ALGUNA FECHA EN ESPECIFICO
                  ref = ref.where('datosPlan.fechaDeCompra', '==', dataFilter.datePremium)
              }
          } else {
              // PARA TODOS LOS PREMIUM
              ref = ref.where('datosPlan.tipoPremium', '!=', null)
          }
      } else {
          // PARA TODOS LOS NO PREMIUM
          if(dataFilter.premium == false){
              ref = ref.where('datosPlan.tipoPremium', '==', null)
          } 
          // SI dataFilter.premium ES null ES PARA TODOS LOS USUARIOS
      }

      return ref
    } 
  },
};
</script>

<style>
</style>
