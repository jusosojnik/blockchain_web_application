<template>
  <div class="about">
    <div class="home">
      <HomeButton :text="text" :link="'/'"/>
    </div>
    <br>
    <br>
    <div class="container">
      <h1>Hänsel und Gretel</h1>
      <br>
      <p>
        Vor einem großen Walde wohnte ein armer Holzhacker mit seiner Frau und seinen zwei Kindern; das Bübchen hieß Hänsel und das Mädchen Gretel. Er hatte wenig zu beißen und zu brechen, und einmal, als große Teuerung ins Land kam, konnte er das tägliche Brot nicht mehr schaffen. Wie er sich nun abends im Bette Gedanken machte und sich vor Sorgen herumwälzte, seufzte er und sprach zu seiner Frau: "Was soll aus uns werden? Wie können wir unsere armen Kinder ernähren da wir für uns selbst nichts mehr haben?" - "Weißt du was, Mann," antwortete die Frau, "wir wollen morgen in aller Frühe die Kinder hinaus in den Wald führen, wo er am dicksten ist. Da machen wir ihnen ein Feuer an und geben jedem noch ein Stückchen Brot, dann gehen wir an unsere Arbeit und lassen sie allein. Sie finden den Weg nicht wieder nach Haus, und wir sind sie los." - "Nein, Frau," sagte der Mann, "das tue ich nicht; wie sollt ich's übers Herz bringen, meine Kinder im Walde allein zu lassen! Die wilden Tiere würden bald kommen und sie zerreißen." - "Oh, du Narr," sagte sie, "dann müssen wir alle viere Hungers sterben, du kannst nur die Bretter für die Särge hobeln," und ließ ihm keine Ruhe, bis er einwilligte. "Aber die armen Kinder dauern mich doch," sagte der Mann...
      </p>
    </div>
  </div>
</template>


<script>
import HomeButton from "../components/HomeButton";

export default {
  name: 'About',
  components: {
    HomeButton,
  },
  data() {
    return {
      text: "go home"
    }
  }
}
</script>

<style scoped>
* {
  color: #e100ff;
  margin-left: 1%;
  margin-right: 1%;
  font-size: 24px;
  text-align: center;
}

h1 {
  color: #0d35f3;
  font-size: 50px;
}

.home {
  width:100%;
  padding-top: 2%;
  display: flex;
  justify-content: center;
}
</style>
