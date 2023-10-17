

const initializeSequencesCollection = async () => {
    try {
      const certificateSequence = await Sequence.findById('certificate');
      
      if (!certificateSequence) {
        await Sequence.create({
          _id: 'certificate',
          sequence_value: 0
        });
  
        console.log("Initialized the 'certificate' sequence.");
      }
    } catch (error) {
      console.error("Error initializing sequences collection:", error);
    }
  };
  