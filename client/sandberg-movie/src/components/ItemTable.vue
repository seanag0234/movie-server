<template>
  <div class="columns">
    <div class="column">
      <div class="card events-card">
        <div>
          <div class="content">
            <div class="content">
              <table class="table is-fullwidth is-striped is-hoverable">
                <tbody>
                <tr>
                  <td class="is-hidden-mobile"></td>
                  <th>Title</th>
                  <th class="is-hidden-mobile">Info</th>
                  <th>Status</th>
                  <th class="is-hidden-mobile">Type</th>
                  <th class="is-hidden-mobile is-hidden-tablet">Updated At</th>
                  <td></td>
                  <td></td>
                </tr>
                <tr v-for="item in items" :key="item.id">
                  <td width="5%" class="is-hidden-mobile"><i class="fa fa-film" aria-hidden="true"></i></td>
                  <td>{{item.title}}</td>
                  <td class="is-hidden-mobile">{{item.info}}</td>
                  <td>{{statusMap[item.status]}}</td>
                  <td class="is-hidden-mobile">{{item.medium}}</td>
                  <td class="is-hidden-mobile is-hidden-tablet">{{convertDate(item.updatedAt)}}</td>
                  <td width="5%"><a @click="editItem(item)" class="button is-small is-primary" href="#">Edit</a></td>
                  <td width="5%"><a @click="startDelete(item)" class="button is-small is-danger" href="#">Delete</a></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: "item-table",
    props: ['items'],
    data() {
      return {
        currentMovie: {}
      }
    },
    methods: {
      ...mapActions({
        updateItem: 'updateItem',
        addItem: 'addItem',
        deleteItem: 'deleteItem',
        toggleShowDelete: 'toggleShowDelete',
        toggleShowAdd: 'toggleShowAdd',
        setCurrentItem: 'setCurrentItem',
        toggleShowEdit: 'toggleShowEdit'
      }),
      editItem: function (item) {
        this.setCurrentItem(item);
        this.toggleShowEdit();
      },
      startDelete: function (item) {
        this.setCurrentItem(item);
        this.toggleShowDelete();
      },
      convertDate: function (timeInMil) {
        let dateObj = new Date(timeInMil);

        let date = dateObj.getFullYear()+'-'+(dateObj.getMonth()+1)+'-'+dateObj.getDate();
        let time = dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
        return date + ' ' + time;
      }
    },
    computed : {
      ...mapGetters([
        'statusMap'
      ]),
    }
  }
</script>

<style scoped>

</style>
