<template>
    <v-dialog v-model="detailsPopup" persistent max-width="800">
        <v-card class="d-flex justify-space-between popup-card" >
            <div class="flex-grow-1">
                <v-img
                    class="popup-img"
                    :src="imgBasePath"
                ></v-img>
            </div>
            <div class="flex-grow-1">
                <span class="group pa-2 close" @click="closeDetails" >
                    <v-icon :x-large="true" color="black" class="close">mdi-close</v-icon>
                </span>
                <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
            </div>
        </v-card>
    </v-dialog>
</template>