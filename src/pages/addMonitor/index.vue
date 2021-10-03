<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { pageTitle } from '/@src/state/sidebarLayoutState'

import { ref } from 'vue'

import walletService from '/@src/services/wallet.service'

pageTitle.value = 'ADD MONITOR'
useHead({
  title: 'ADD MONITOR',
})

const notificationSettings = [
  {
    id: 'erc20:transfer',
    name: 'NFT Mints',
  },
  {
    id: 'erc721:send',
    name: 'NFT Buys',
  },
  {
    id: 'erc721:receive',
    name: 'NFT Sells',
  },
  {
    id: 'erc721:mint',
    name: 'Token Swaps',
  },
]

const notifyIntervalList = [
  {
    id: 'Immediately',
    name: 'Immediately',
  },
  {
    id: 'Hourly',
    name: 'Hourly',
  },
  {
    id: 'Bi-Daily',
    name: 'Bi-Daily',
  },
  {
    id: 'Daily',
    name: 'Daily',
  },
]
let walletAddress = ref('')
let friendlyName = ref('')
let monitorEvents = ref(Array<string>())
let notifyInterval = ref('')
let notificationMode = ref(Array<string>())

const handleSubmit = async () => {
  const payload = {
    wallet: walletAddress.value,
    createdBy: '0x699C09b0DEEd17C2a659f296dF1dB5A2feb72474',
    name: friendlyName.value,
    notifyInterval: notifyInterval.value,
    notificationMode: notificationMode.value,
    email: notificationMode.value.includes('email')
      ? 'newcometcto729@gmail.com'
      : '',
    webhookUrl: notificationMode.value.includes('discord-webhook')
      ? 'https://discord.com/api/webhooks/891150471992066109/looLLVF017u2GDwtZ0qeHJe-WwZ5xckdsPRuPDZ_ng-JavYmviSHeEj3yUm4Ex2tKjr7'
      : '',
    events: monitorEvents.value,
  }
  console.log(payload)
  let resp = await walletService.addMonitor(payload)
  console.log(resp)
}
const handleMonitorEvents = (idx: number) => {
  monitorEvents.value = monitorEvents.value.includes(
    notificationSettings[idx].id
  )
    ? monitorEvents.value.filter((one) => one != notificationSettings[idx].id)
    : monitorEvents.value.concat(notificationSettings[idx].id)
}
const handleNotifiyInterval = (idx: number) => {
  notifyInterval.value = notifyIntervalList[idx].id
}
</script>

<template>
  <form class="form-layout is-separate mt--29" @submit.prevent="handleSubmit">
    <div class="form-outer">
      <div class="form-body display-block pt-0 pb-0">
        <div class="form-section add-monitor-layout">
          <div class="form-section-inner has-padding-bottom p-20">
            <div class="columns is-multiline">
              <h1 class="add-monitor-title letter-color ml-13 mb-3">
                Enter ETH Wallet Address To Monitor (ENS Supported)
              </h1>
              <div class="ml-13 letter-spacing-1">
                <h3 class="font-11">
                  Enter the
                  <span class="is-purple">ETH Wallet Address</span> such as:
                  <span class="is-purple"
                    >0x37ef5b0412cd864e368c53f77a0de4ac64b93f1</span
                  >
                  that
                </h3>
                <h3 class="font-11">you would like to monitor.</h3>
              </div>
              <div class="column is-12">
                <VField>
                  <h3 class="margin-y-10 font-11 letter-spacing-1">
                    <span class="is-purple">ENS names</span> are also supported.
                    ex: <span class="is-purple">CoolCustomeName.eth</span>
                  </h3>
                  <VControl>
                    <input
                      v-model="walletAddress"
                      type="text"
                      class="input w60"
                      placeholder="0x0000000000000000000000000000000000000000"
                      autocomplete="text"
                      inputmode="text"
                    />
                  </VControl>
                </VField>
              </div>
              <div class="column is-12">
                <VField>
                  <h3 class="margin-y-10 font-11 letter-spacing-1">
                    OPTIONAL: Enter a
                    <span class="is-purple">friendly name</span> for the
                    monitor.
                  </h3>
                  <VControl>
                    <input
                      v-model="friendlyName"
                      type="text"
                      class="input w60 placeholder-letter"
                      placeholder="Enter Friendly Name (Optional)"
                      autocomplete="street-address"
                    />
                  </VControl>
                </VField>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section add-monitor-layout pt-0">
          <div class="form-section-inner has-padding-bottom p-20 pt-11">
            <h1 class="add-monitor-title letter-color ml-0">
              Events to Monitor
            </h1>
            <div class="columns is-multiline">
              <div class="column is-12 pb-0">
                <VField>
                  <h3 class="margin-y-1 font-11 letter-spacing-1">
                    Select the event that you want to monitor.
                  </h3>
                </VField>
                <div class="saas-billing-wrapper">
                  <div class="plans-wrapper border-bottom-none mb-0 pb-0 mt--8">
                    <div class="left w-100">
                      <div class="inner-wrap">
                        <div class="plans">
                          <div
                            v-for="(plan, index) in notificationSettings"
                            :key="plan.id"
                            class="plan w-98"
                          >
                            <input
                              type="radio"
                              :name="plan.id"
                              :checked="monitorEvents.includes(plan.id)"
                              @click="handleMonitorEvents(index)"
                            />
                            <div class="plan-inner p-10 letter-center">
                              <div class="meta ml-0">
                                <span class="font-11">{{ plan.name }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section add-monitor-layout pt-0">
          <div class="form-section-inner has-padding-bottom p-20 pt-11">
            <h1 class="add-monitor-title letter-color ml-0">
              Notification Settings
            </h1>
            <div class="columns is-multiline">
              <div class="column is-9 pb-0">
                <VField>
                  <h3 class="margin-y-6 font-11 letter-spacing-1">
                    Select when to be notified after an event is detected on the
                    monitored wallet:
                  </h3>
                </VField>
                <div class="saas-billing-wrapper">
                  <div class="plans-wrapper border-bottom-none mb-0 pb-0 mt--8">
                    <div class="left w-100">
                      <div class="inner-wrap">
                        <div class="plans">
                          <div
                            v-for="(plan, index) in notifyIntervalList"
                            :key="plan.id"
                            class="plan w-98"
                          >
                            <input
                              type="radio"
                              :name="plan.id"
                              :checked="notifyInterval == plan.id"
                              @click="handleNotifiyInterval(index)"
                            />
                            <div class="plan-inner p-10 letter-center">
                              <div class="meta ml-0">
                                <span class="font-11">{{ plan.name }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column is-3 pb-0">
                <div class="job-time">
                  <div class="job-wrapper">
                    <div class="type-container pb-10 font-12">
                      <V-Checkbox
                        v-model="notificationMode"
                        value="email"
                        label="Discord webhook"
                        color="primary"
                        paddingless
                      />
                    </div>
                    <div class="type-container font-12">
                      <V-Checkbox
                        v-model="notificationMode"
                        value="discord-webhook"
                        label="Email"
                        color="primary"
                        paddingless
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section add-monitor-layout">
          <div class="form-section-outer">
            <!-- <div class="checkboxes">
              <VField>
                <VControl>
                  <label class="checkbox is-circle">
                    <input type="checkbox" checked />
                    <span></span>
                    Create an account
                  </label>
                </VControl>
              </VField>
              <VField>
                <VControl>
                  <label class="checkbox is-circle">
                    <input type="checkbox" />
                    <span></span>
                    Subscribe to our Newsletter
                  </label>
                </VControl>
              </VField>
            </div> -->
            <div class="button-wrap text-center">
              <VButton color="primary" type="submit" bold raised>
                <span class="sub_btn">
                  <span class="fa-fw select-all fas"></span>&nbsp;&nbsp;&nbsp;
                  Add Monitor
                </span>
              </VButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss">
@import '../../scss/abstracts/_mixins.scss';
@import '../../scss/pages/generic/_forms.scss';
@import '../../scss/pages/custom.scss';
</style>

<style lang="scss">
@import '../../scss/abstracts/_mixins.scss';

/* ==========================================================================
1. SaaS Billing
========================================================================== */

.saas-billing-wrapper {
  max-width: 980px;
  margin: 0 auto;

  .plans-wrapper {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--fade-grey-dark-4);
    padding-bottom: 20px;
    margin-bottom: 20px;

    .left {
      width: 50%;

      .inner-wrap {
        > h3 {
          font-family: var(--font-alt);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--dark-text);
          margin-bottom: 10px;
        }
      }

      .plans {
        display: flex;
        flex-wrap: wrap;
        margin-left: -8px;
        margin-right: -8px;

        .plan {
          position: relative;
          width: calc(50% - 16px);
          max-width: calc(50% - 16px);
          margin: 8px;

          input {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            cursor: pointer;
            z-index: 1;

            &:checked + .plan-inner {
              border-color: var(--primary);
              box-shadow: var(--light-box-shadow);

              img {
                filter: grayscale(0);
                opacity: 1;
              }

              .checkmark {
                display: flex;
              }
            }
          }

          .plan-inner {
            @include vuero-s-card();

            width: 100%;
            flex: 0;
            display: flex;
            align-items: center;
            transition: all 0.3s;

            img {
              display: block;
              height: 32px;
              width: 32px;
              min-width: 32px;
              filter: grayscale(1);
              opacity: 0.6;
              pointer-events: none;
              transition: all 0.3s;
            }

            .meta {
              margin-left: 12px;
              line-height: 1.3;

              span {
                display: block;
                font-family: var(--font);

                &:first-child {
                  font-family: var(--font-alt);
                  font-size: 0.95rem;
                  font-weight: 600;
                  color: var(--dark-text);
                }

                &:nth-child(2) {
                  color: var(--light-text);
                  font-size: 0.85rem;
                }
              }
            }

            .checkmark {
              margin-left: auto;
              display: none;
              justify-content: center;
              align-items: center;
              height: 32px;
              width: 32px;
              min-width: 32px;
              border-radius: var(--radius-rounded);
              background: var(--white);
              border: 1px solid var(--fade-grey-dark-3);
              box-shadow: var(--light-box-shadow);
              color: var(--success);

              svg {
                width: 16px;
                height: 16px;
                stroke-width: 3px;
              }
            }
          }
        }
      }
    }

    .right {
      width: 45%;
      padding: 20px 0;
      margin-left: auto;

      .plan-details {
        > h3 {
          font-family: var(--font);
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--dark-text);
          margin-bottom: 10px;
        }

        .plan-details-inner {
          .plan-description {
            display: flex;
            align-items: center;

            .left {
              max-width: 200px;

              img {
                display: block;
                height: 160px;
                width: 160px;
                min-width: 160px;
                margin: 0 auto;
              }
            }

            .right {
              flex-grow: 2;

              .plan-pricing {
                padding: 5px 0 10px 0;
                font-family: var(--font);
                line-height: 1.3;

                span {
                  display: block;
                  font-size: 0.9rem;
                  font-weight: 500;
                  color: var(--primary);
                  font-family: var(--font-alt);

                  &:first-child {
                    color: var(--dark-text);
                  }

                  b {
                    font-size: 2rem;
                    font-family: var(--font);
                  }
                }
              }

              .plan-moto {
                p {
                  font-size: 0.9rem;
                }
              }
            }
          }

          .plan-summary {
            .plan-features {
              ul {
                font-family: var(--font-alt);
                font-size: 0.95rem;
                color: var(--dark-text);
              }
            }
          }
        }
      }
    }
  }

  .billing-options-wrapper {
    display: flex;
    align-items: flex-start;

    .left {
      width: 50%;

      .option-block {
        @include vuero-s-card();

        margin-bottom: 20px;

        .block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;

          h3 {
            font-family: var(--font-alt);
            font-size: 1rem;
            font-weight: 600;
            color: var(--dark-text);
          }

          span {
            font-family: var(--font);
            color: var(--light-text);
          }

          a {
            font-family: var(--font);
            color: var(--light-text);

            &:hover {
              color: var(--primary);
            }
          }
        }

        .block-body {
          &.is-seats {
            display: flex;
            padding-bottom: 10px;

            .v-avatar {
              margin-right: 8px;
            }

            .add-seat {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 40px;
              width: 40px;
              min-width: 40px;
              border-radius: var(--radius-rounded);
              border: 1.6px dashed var(--light-text);
              color: var(--light-text);
              outline: none;
              padding: 0;
              background: none;
              margin-left: 4px;
              cursor: pointer;
              transition: all 0.3s;

              &:hover {
                border: 1.6px solid var(--primary);
                color: var(--primary);
              }

              svg {
                height: 16px;
                width: 16px;
              }
            }
          }
        }
      }
    }

    .right {
      width: 45%;
      margin-left: auto;

      .payment-form {
        padding: 20px 30px;
        background: var(--white);
        border-radius: var(--radius);
        border: 1px solid var(--fade-grey-dark-3);

        .form-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          h3 {
            font-family: var(--font-alt);
            font-size: 1rem;
            font-weight: 600;
            color: var(--dark-text);
          }

          span {
            font-family: var(--font);
            color: var(--light-text);
            cursor: pointer;
          }
        }

        .form-container {
          padding: 30px 0 20px 0;
          max-width: 330px;
          margin: 0 auto;
          color: #707070;

          .column {
            padding: 0.25rem 0.75rem;
          }

          .field {
            margin-bottom: 0;

            .control {
              position: relative;

              .creditcardIcon {
                svg {
                  height: 30px;
                  position: absolute;
                  right: -2px;
                  top: 4px;
                  width: 60px;
                }
              }
            }
          }

          .button-wrap {
            padding-top: 16px;

            .v-button {
              min-height: 50px;
            }
          }
        }
      }
    }
  }
}

/* ==========================================================================
2. SaaS Billing Dark mode
========================================================================== */

.is-dark {
  .saas-billing-wrapper {
    .plans-wrapper {
      border-color: var(--dark-sidebar-light-20);

      .left {
        .inner-wrap {
          > h3 {
            color: var(--dark-dark-text);
          }
        }

        .plans {
          .plan {
            input {
              &:checked + .plan-inner {
                border-color: var(--primary) !important;
              }
            }

            .plan-inner {
              @include vuero-card--dark();

              .meta span {
                &:first-child {
                  color: var(--dark-dark-text);
                }
              }

              .checkmark {
                background: var(--dark-sidebar-light-2);
                border-color: var(--dark-sidebar-light-12);
              }
            }
          }
        }
      }

      .right {
        .plan-details {
          .plan-details-inner {
            .plan-description {
              .right {
                .plan-pricing span {
                  &:first-child {
                    color: var(--dark-dark-text);
                  }

                  &:nth-child(2) {
                    color: var(--primary);
                  }
                }
              }
            }

            .plan-summary {
              .plan-features {
                ul {
                  color: var(--dark-dark-text);
                }
              }
            }
          }
        }
      }
    }

    .billing-options-wrapper {
      .left {
        .option-block {
          @include vuero-card--dark();

          .block-header {
            h3 {
              color: var(--dark-dark-text);
            }

            a:hover {
              color: var(--primary);
            }
          }

          .block-body {
            &.is-seats {
              .add-seat:hover {
                border-color: var(--primary);
                color: var(--primary);
              }
            }
          }
        }
      }

      .right {
        .payment-form {
          background: var(--dark-sidebar-light-6);
          border-color: var(--dark-sidebar-light-12);

          .form-header {
            h3 {
              color: var(--dark-dark-text);
            }

            span:hover,
            a:hover {
              color: var(--primary);
            }
          }
        }
      }
    }
  }
}

/* ==========================================================================
3. SaaS Billing Media Queries
========================================================================== */

@media only screen and (max-width: 767px) {
  .saas-billing-wrapper {
    .plans-wrapper {
      flex-direction: column;

      .left,
      .right {
        width: 100%;
        max-width: 100%;
      }

      .left {
        .plans {
          .plan {
            .plan-inner {
              position: relative;
              flex-direction: column;
              text-align: center;

              .checkmark {
                position: absolute;
                top: 10px;
                right: 10px;
              }
            }
          }
        }
      }

      .right {
        .plan-details {
          .plan-details-inner {
            .plan-summary {
              .plan-features {
                .columns {
                  display: flex;
                }
              }
            }
          }
        }
      }
    }

    .billing-options-wrapper {
      flex-direction: column;

      .left,
      .right {
        width: 100%;
        max-width: 100%;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .saas-billing-wrapper {
    max-width: 690px;

    .plans-wrapper {
      flex-direction: column;

      .left,
      .right {
        width: 100%;
        max-width: 100%;
      }

      .left {
        .plans {
          .plan {
            .plan-inner {
              position: relative;
              flex-direction: column;
              text-align: center;

              .checkmark {
                position: absolute;
                top: 10px;
                right: 10px;
              }
            }
          }
        }
      }

      .right {
        .plan-details {
          .plan-details-inner {
            .plan-summary {
              .plan-features {
                .columns {
                  display: flex;
                }
              }
            }
          }
        }
      }
    }

    .billing-options-wrapper {
      flex-direction: column;

      .left,
      .right {
        width: 100%;
        max-width: 100%;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .saas-billing-wrapper {
    .plans-wrapper {
      .left {
        .plans {
          .plan {
            .plan-inner {
              .checkmark {
                position: absolute;
                top: 10px;
                right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
