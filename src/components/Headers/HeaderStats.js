import React from "react";
import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  return (
    <>
      <div
        className="relative pt-12 pb-32"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0510 60%, #0a0a0a 100%)' }}
      >
        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #e11d48, transparent)' }}></div>

        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="MEMBRES ACTIFS"
                  statTitle="1,247"
                  statArrow="up"
                  statPercent="12.5"
                  statPercentColor="text-green-400"
                  statDescripiton="Depuis le mois dernier"
                  statIconName="fas fa-users"
                  statIconColor="bg-red-600"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="ABONNEMENTS ACTIFS"
                  statTitle="846"
                  statArrow="up"
                  statPercent="8.3"
                  statPercentColor="text-green-400"
                  statDescripiton="Depuis le mois dernier"
                  statIconName="fas fa-id-card"
                  statIconColor="bg-red-700"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="REVENUS MENSUELS"
                  statTitle="28,490 DT"
                  statArrow="up"
                  statPercent="5.7"
                  statPercentColor="text-green-400"
                  statDescripiton="Depuis le mois dernier"
                  statIconName="fas fa-dollar-sign"
                  statIconColor="bg-red-800"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="SÉANCES AUJOURD'HUI"
                  statTitle="89"
                  statArrow="down"
                  statPercent="3.2"
                  statPercentColor="text-red-400"
                  statDescripiton="Depuis hier"
                  statIconName="fas fa-dumbbell"
                  statIconColor="bg-red-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}