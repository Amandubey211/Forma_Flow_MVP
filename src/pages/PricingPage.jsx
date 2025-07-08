import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "../components/ui/Button";
import { ToggleSwitch } from "../components/ui/ToggleSwitch";

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    price: { monthly: "$0", annually: "$0" },
    description: "For individuals and hobbyists starting out.",
    features: [
      "5 Templates",
      "50 Submissions/mo",
      "Basic Fields",
      "FormaFlow Branding",
    ],
    isMostPopular: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    price: { monthly: "$29", annually: "$24" },
    description: "For professionals and creators who need more power.",
    features: [
      "15 Templates",
      "1,000 Submissions/mo",
      "Advanced Fields (File Uploads)",
      "Conditional Logic",
      "Remove Branding",
      "Priority Email Support",
    ],
    isMostPopular: true,
  },
  {
    name: "Business",
    id: "tier-business",
    price: { monthly: "$99", annually: "$83" },
    description: "For teams and businesses that need to collaborate.",
    features: [
      "Unlimited Templates",
      "10,000 Submissions/mo",
      "Team Collaboration (5 seats)",
      "Workflow & Approvals",
      "Direct Integrations (Sheets, Slack)",
      "Dedicated Support",
    ],
    isMostPopular: false,
  },
];

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' or 'annually'

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* Header Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
            Find the perfect plan for you
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Start for free and scale as you grow. All plans include unlimited
            fields and real-time previews.
          </p>
        </motion.div>

        {/* Monthly/Annually Toggle */}
        <motion.div
          className="mt-12 flex justify-center items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span
            className={`font-medium ${billingCycle === "monthly" ? "text-indigo-600" : "text-slate-500"}`}
          >
            Monthly
          </span>
          <ToggleSwitch
            enabled={billingCycle === "annually"}
            setEnabled={(checked) =>
              setBillingCycle(checked ? "annually" : "monthly")
            }
          />
          <span
            className={`font-medium ${billingCycle === "annually" ? "text-indigo-600" : "text-slate-500"}`}
          >
            Annually
          </span>
          <span className="ml-2 px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full">
            Save 20%
          </span>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              className={`relative p-8 rounded-2xl border ${tier.isMostPopular ? "border-indigo-500 shadow-2xl" : "border-slate-200 bg-white"}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {tier.isMostPopular && (
                <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white text-sm font-semibold rounded-full shadow-md">
                    <Star size={16} fill="white" />
                    Most Popular
                  </div>
                </div>
              )}
              <h3 className="text-2xl font-semibold text-slate-900">
                {tier.name}
              </h3>
              <p className="mt-4 text-slate-500">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-x-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={billingCycle}
                    className="text-5xl font-bold tracking-tight text-slate-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tier.price[billingCycle]}
                  </motion.span>
                </AnimatePresence>
                <span className="text-sm font-semibold leading-6 tracking-wide text-slate-600">
                  /month
                </span>
              </div>

              <Button
                variant={tier.isMostPopular ? "default" : "outline"}
                className="w-full mt-8 h-11"
              >
                Get Started
              </Button>

              <ul
                role="list"
                className="mt-8 space-y-4 text-sm leading-6 text-slate-600"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check
                      className="h-6 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
