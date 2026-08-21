import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/shared/Logo";
import Button from "../components/ui/Button";

const ALL_SKILLS = [
  "Python", "React", "Excel", "Figma", "Photoshop",
  "Classical Guitar", "Piano", "Public Speaking",
  "Video Editing", "Adobe Lightroom", "English Writing", "Cooking",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [teach, setTeach] = useState([]);
  const [learn, setLearn] = useState([]);
  const navigate = useNavigate();

  const toggle = (list, setList, skill) => {
    setList(
      list.includes(skill) ? list.filter((s) => s !== skill) : [...list, skill]
    );
  };

  const handleFinish = () => navigate("/dashboard");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-12">
      <Logo />

      <div className="w-full max-w-lg mt-10">
        <div className="flex items-center gap-2 mb-8">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full ${
                s <= step ? "bg-brand" : "bg-border"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div>
            <h1 className="text-xl font-bold text-text text-center">
              What can you teach?
            </h1>
            <p className="text-sm text-muted text-center mt-1 mb-6">
              Pick a few skills you're comfortable teaching others.
            </p>

            <div className="flex flex-wrap gap-2 justify-center">
              {ALL_SKILLS.map((skill) => {
                const active = teach.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggle(teach, setTeach, skill)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      active
                        ? "bg-teal-soft border-teal text-teal"
                        : "bg-white border-border text-muted hover:border-teal/40"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>

            <Button
              className="w-full mt-8"
              disabled={teach.length === 0}
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-xl font-bold text-text text-center">
              What do you want to learn?
            </h1>
            <p className="text-sm text-muted text-center mt-1 mb-6">
              We'll match you with students who can teach these.
            </p>

            <div className="flex flex-wrap gap-2 justify-center">
              {ALL_SKILLS.filter((s) => !teach.includes(s)).map((skill) => {
                const active = learn.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggle(learn, setLearn, skill)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      active
                        ? "bg-brand-soft border-brand text-brand"
                        : "bg-white border-border text-muted hover:border-brand/40"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-1"
                disabled={learn.length === 0}
                onClick={handleFinish}
              >
                Finish setup
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
