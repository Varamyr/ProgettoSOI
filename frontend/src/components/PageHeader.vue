<template>
    <div class="headerContainer">
        <b-navbar class="header" fixed="top" toggleable="lg" type="dark" variant="dark">
            
            <b-navbar-brand href="#"> <h3><img class="appLogo" alt="Vue logo" src="../assets/logo.png"> Hello E-commerce</h3> </b-navbar-brand>
            
            
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">Link</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                    <em>User</em>
                </template>
                <b-dropdown-item href="#">Login</b-dropdown-item>
                <b-dropdown-item href="#">Register</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'PageHeader'
}
</script>

<style scoped>
.appLogo {
    height: 40px;
}
.headerContainer
{
    margin-bottom: 100px;
}

.header
{
    padding-top:20px;
    box-shadow: 0px 5px 10px black;
}
</style>