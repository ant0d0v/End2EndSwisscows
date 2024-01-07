class SlowStepReporter {
  constructor() {
    this.steps = [];
  }

  onStepEnd(test, result, step) {
    if (step.category === "test.step") {
      const stepToReport = {
        count: 1,
        name: step.titlePath().join("->"),
        duration: step.duration,
      };

      const alreadyReported = this.steps.find(
        (s) => s.name === stepToReport.name
      );

      if (alreadyReported) {
        alreadyReported.count++;
      } else {
        this.steps.push(stepToReport);
      }
    }
  }

  onEnd(result) {
    console.warn("TOP-10 slowest steps");
    console.table(
      // Slowest first
      this.steps
        .sort((a, b) => b.duration - a.duration)
        // TOP-10 slowest steps
        .slice(0, 10)
    );
  }
}
//location: `${step.location?.file}:${step.location?.line}`,
module.exports = SlowStepReporter;
