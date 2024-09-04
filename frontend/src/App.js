import React from 'react';
import ContractDetails from './components/ContractDetails/ContractDetails';
import GetContracts from './components/GetContracts/GetContracts';
import UnpaidJobs from './components/UnpaidJobs/UnpaidJobs';
import PayJob from './components/PayJob/PayJob';
import DepositBalance from './components/DepositBalance/DepositBalance';
import BestProfession from './components/BestProfession/BestProfession';
import BestClients from './components/BestClients/BestClients';
import './App.css'; 

const App = () => {


    return (
      <div className="App">
          <header className="App-header">
              <h1>API Data Dashboard</h1>
          </header>

          <main>
              <section className="data-section">
                 <GetContracts />                  
              </section>

              <section className="data-section">
                 <ContractDetails />
              </section>

              <section className="data-section">
                 <UnpaidJobs />
              </section>

              <section className="data-section">
                 <PayJob />
              </section>

              <section className="data-section">
                 <DepositBalance />
              </section>

              <section className="data-section">
                 <BestProfession />
              </section>

              <section className="data-section">
                 <BestClients />
              </section>


        
          </main>
      </div>
    );
};

export default App;
