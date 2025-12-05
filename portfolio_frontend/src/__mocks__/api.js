export const getAbout = jest.fn(() => Promise.resolve({ name: 'Mock User', title: 'Engineer', bio: 'Mock bio', skills: [] }));
export const getProjects = jest.fn(() => Promise.resolve([]));
export const getExperience = jest.fn(() => Promise.resolve([]));
export const postContact = jest.fn(() => Promise.resolve({ ok: true }));
export default {
  getAbout,
  getProjects,
  getExperience,
  postContact,
};
