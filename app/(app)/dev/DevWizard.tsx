import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Wizard } from 'react-native-ui-lib'
import { RNUIButton } from '@/components'

type Props = {}
const STEPS = [
  {
    step: 1,
    label: 'Your Location',
    state: Wizard.States.ENABLED,
  },
  {
    step: 2,
    label: 'Your Interests',
    state: Wizard.States.DISABLED,
  },
  {
    step: 3,
    label: 'Contact Information',
    state: Wizard.States.DISABLED,
  },
]
export default function DevWizard(props: Props) {
  const { styles } = useStyles(stylesheet)
  const [activeIndex, setActiveIndex] = useState(0)
  const [completedStepIndex, setCompletedStepIndex] = useState(0)

  const onAllTypesIndexChanged = (allTypesIndex: number) => {
    setActiveIndex(allTypesIndex)
  }
  const getStepState = (index: number) => {
    let state = Wizard.States.DISABLED
    if (completedStepIndex && completedStepIndex > index - 1) {
      state = Wizard.States.COMPLETED
    } else if (activeIndex === index || completedStepIndex === index - 1) {
      state = Wizard.States.ENABLED
    }

    return state
  }

  // const reset = () => {
  //   const {customerName, selectedFlavor} = this.state;

  //   this.setState({
  //     activeIndex: 0,
  //     completedStepIndex: undefined,
  //     selectedFlavor: initialFlavor,
  //     customerName: undefined,
  //     toastMessage: `${customerName}, you bought some ${selectedFlavor.toLowerCase()}`
  //   },
  //   this.closeToast);
  // };

  const goToNextStep = () => {
    const reset = prevActiveIndex === 2
    if (reset) {
      // this.reset()
      return
    }

    const activeIndex = prevActiveIndex + 1
    let completedStepIndex: number | undefined = prevCompletedStepIndex
    if (!prevCompletedStepIndex || prevCompletedStepIndex < prevActiveIndex) {
      completedStepIndex = prevActiveIndex
    }

    if (activeIndex !== prevActiveIndex || completedStepIndex !== prevCompletedStepIndex) {
      this.setState({ activeIndex, completedStepIndex })
    }
  }

  const renderCurrentStep = () => {
    switch (activeIndex) {
      case 0:
      default:
        return renderTest()
      case 1:
        return renderTest()
      case 2:
        return renderTest()
    }
  }

  const renderTest = () => {
    return (
      <View style={styles.stepContainer}>
        <Text>Complete the purchase {activeIndex}</Text>
      </View>
    )
  }

  return (
    <View>
      <View style={styles.ScrollView}>
        <View style={styles.container}>
          <Text>{activeIndex}</Text>
          <Text>{completedStepIndex}</Text>
          <Wizard activeIndex={activeIndex} onActiveIndexChanged={onAllTypesIndexChanged}>
            {STEPS.map((step, index) => (
              <Wizard.Step key={index} state={getStepState(step.step)} label={step.label} />
            ))}
            {/* <Wizard.Step state={getStepState(0)} label={'Select items'} />
            <Wizard.Step state={getStepState(1)} label={'Customer details'} />
            <Wizard.Step state={getStepState(2)} label={'Checkout'} /> */}
          </Wizard>
          {renderCurrentStep()}

          <RNUIButton label="Next" onPress={() => setActiveIndex(activeIndex + 1)} />
        </View>
      </View>
    </View>
  )
}

const stylesheet = createStyleSheet(theme => ({
  ScrollView: {},
  container: {},
  stepContainer: {
    // flex: 1,
    // justifyContent: 'space-between',
    // margin: 20,
  },
}))
