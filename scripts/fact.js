function getFact() {
      const factEl = document.getElementById("fact");

      const type = Math.random();

      factEl.innerText = "Baggen funderar... 🐑";

      // 🐑 Roliga bagg-fakta
      if (type < 0.3) {
        const funnyFacts = [
          "Jag är en bagge. Jag litar inte på dig.",
          "Glass är inte ett vapen. Du gjorde det till ett vapen.",
          "Jag hade ett lugnt liv innan detta.",
          "Du missade. Jag såg det.",
          "Detta är inte en säker plats att stå på."
        ];

        setTimeout(() => {
          factEl.innerText = "🐑 " + funnyFacts[Math.floor(Math.random() * funnyFacts.length)];
        }, 600);

      // 🏝️ Gotland-fakta
      } else if (type < 0.6) {
        const gotlandFacts = [
          "Gotland är Sveriges största ö.",
          "Raukar bildas av kalksten som eroderats av havet.",
          "Visby är en av de bäst bevarade medeltida städerna.",
          "Det finns över 90 medeltida kyrkor på Gotland.",
          "Gotland har fler soltimmar än resten av Sverige."
        ];

        setTimeout(() => {
          factEl.innerText = "🏝️ " + gotlandFacts[Math.floor(Math.random() * gotlandFacts.length)];
        }, 600);

      // 🌍 API-fakta
      } else {
        fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
          .then(res => res.json())
          .then(data => {
            const factText = data.text || data.fact;
            factEl.innerText = "🌍 " + factText;
          })
          .catch(() => {
            factEl.innerText = "Faktan rymde 😢";
          });
      }

      // 🎨 liten färgeffekt
      factEl.style.color = "#" + Math.floor(Math.random()*16777215).toString(16);
    }