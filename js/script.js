    (function () {
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Элементы, которые "проявляются" при прокрутке
      var revealTargets = document.querySelectorAll(
        '.feature-card, .mini-feature, .pricing-card, .preview-item, .faq-item, ' +
        '.trust-title, .trust-subtitle, .impression-title, .impression-subtitle, ' +
        '.section-title, .section-subtitle, .chart-card, .activity-card'
      );

      if (reduceMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
        return;
      }

      revealTargets.forEach(function (el, i) {
        el.classList.add('reveal-up');
        el.style.animationDelay = (Math.min(i % 4, 3) * 0.08) + 's';
      });

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      revealTargets.forEach(function (el) { observer.observe(el); });
    })();