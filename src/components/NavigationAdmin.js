import React from 'react';

const NavigationAdmin = () => {
    return (
        
            <div class="row flex-nowrap mt-4">
              <div class="col-auto col-md-2 col-xl-2 px-sm-2 px-0 mt-4 menuGauche">
                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100 mt-4">
                  <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                      <a href="#" class="nav-link align-middle px-0">
                        <i class="fs-4 bi-speedometer2"></i>
                        <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="#" class="nav-link align-middle px-0">
                        <i class="fs-4 bi-speedometer2"></i>
                        <span class="ms-1 d-none d-sm-inline">Evénements</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="#" class="nav-link align-middle px-0">
                        <i class="fs-4 bi-speedometer2"></i>
                        <span class="ms-1 d-none d-sm-inline">Articles</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="#" class="nav-link align-middle px-0">
                        <i class="fs-4 bi-speedometer2"></i>
                        <span class="ms-1 d-none d-sm-inline">Comentaires</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="#" class="nav-link align-middle px-0">
                        <i class="fs-4 bi-speedometer2"></i>
                        <span class="ms-1 d-none d-sm-inline">Sites</span>
                      </a>
                    </li>
                    
                    <li class="nav-item">
                      <a href="#" class="nav-link align-middle px-0">
                        <i class="bi bi-envelope-at"></i>
                        <span class="d-none d-sm-inline">Contacts</span>
                    </a>
                    </li>

                      <li class="nav-item">
                      <a href="#" class="nav-link align-middle px-0">
                        <i class="fs-4 bi-people"></i>
                        <span class="ms-1 d-none d-sm-inline">Utilisateur</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="#" class="nav-link align-middle px-0">
                            <i class="fs-4 bi bi-person"></i>
                            <span class="ms-1 d-none d-sm-inline">Mon Compte</span>
                        </a>
                    </li>
                </ul>
            
            </div>
        </div>
        
    )
};

export default NavigationAdmin;