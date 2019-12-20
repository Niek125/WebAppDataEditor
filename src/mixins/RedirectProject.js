export const redirectProject = {
    methods: {
        redirectProject: function (id, comp) {
            comp.$router.push({name: 'dataview', params: {projectid: id}});
            let cookie = JSON.parse(comp.$cookie.get('recent'));
            if (cookie != null) {
                for (let i = 0; i < cookie.length; i++) {
                    // if ((new String(cookie[i].value).valueOf() == new String(id).valueOf()) || (i > 3)) {
                    //     cookie.splice(i, 1);
                    //     i--;
                    // }
                }
                //cookie.unshift(comp.projects.find(x => x.value == id))
                comp.$cookie.set('recent', JSON.stringify(cookie), {expires: '1M'});
            }
        }
    }
}