<script setup lang="ts">
import { onBeforeMount, ref, toRaw } from 'vue';
import ViolationCard from './ViolationCard.vue';
import { Alliance, Alliances } from '../ts/Alliance';
import { Violation } from '../ts/Violation';


const alliances = ref<Alliances>({})
const violations = ref<Violation[]>([])

async function loadJSON(): Promise<JSON> {
    const dataFetch = await fetch('src/assets/data.json')
    const data = await dataFetch.json()
    return data
}

function allianceToViolation(object: [string, Alliance]): Violation {
    return {
        theViolations: object[1].found_patterns,
        summary: object[1].summary,
        alliance_id: object[0],
        happenedIn: object[1]
    }

}

onBeforeMount( async () => {
    alliances.value = await loadJSON() as any as Alliances
    violations.value = Object.entries(alliances.value).map(allianceToViolation)
})



</script>


<template>
    <div class="m-10">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl mb-10"> Alliance Behavioral Pattern Recognition </h1>
        <p>Welcome to the behavioral pattern recognition of Team Cantaloupe made during Start Hack 2023. 
            <br>
            Given the first of March's 2023 Crash Royale chats and clan interactions, 
            we recognized certain behaviors in users which create a tough environment for innocent players. 
            Our focus were clans, as they are the main source for human interaction in the game, and can be the most hurtful, 
            e.g. by chat or kicks. 
            <br>
            We started off by combining the chat with the clan interactions to recreate the full log. 
            Performing Data Analysis on the classifications of clans' texts,  we estimated average risk values in the given 
            categories like "Hate Speech", which are summarized for a Clan in the form of a HeatMap that you can discover in the cards. 
            <br>
            To make it more interesting, we recognized certain behavioral patterns that occured during the day. 
            One such pattern is "join_hate_leave", in which users join a clan, troll around, and leave later on. 
            "offended_leave"s are when individuals are angry and "rage quit". "join_kick_join_kick" 
            are repeated kicks against an individual who desperately tries to re-enter the clan just to repeat the process. 
            <br>
            When you want more details on the users in which these incidents occur, click the "Read More" field in a ticket to see 
            all players and their base stats, as well as the belonging chat logs, that were involved. As these can get quite long, 
            an idea was to use Chat-GPT to summarize the chats, as seen on the second ticket. Sadly, we couldn't automate this process
            due to payment restictrions, so many summaries are yet empty. 
            <br>
            Admins should also be able to quickly 
            move on from a case once they confirmed a violation. So our "Quick Action Buttons" on the right are a little suggestion 
            of ours. 
            <br>
            All in all, We picked out 16 interesting cases for you to discover. It was surprising to see how many toxic events could
            be discovered in a single day. Many hardcore players were observably often creating a rougher environment, as e.g. ticket 1 shows. 
            <br>
            Check us out on https://github.com/Tobias314/CantaloupeStartHack23
        </p>  
        
        
        <template v-for="violation, index in violations" :key="violation">
            <ViolationCard :violation="toRaw(violation)" :index="index"/>
        </template>
    </div>
    
</template>
