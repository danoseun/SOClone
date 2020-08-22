/**
 * Function clears all data
 * from document
 */

export const deleteAllData = async (document) => {
    try {
      await document.deleteMany();
      console.log(`All collections successfully deleted`);
    } catch (err) {
      console.log(err);
    }
  };