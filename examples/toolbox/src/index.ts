import { config } from "dotenv";
import { Sara } from "sara-sdk-ts";

config();

await Sara.auth(
  process.env.SARA_ACCESS_KEY as string,
  process.env.SARA_SECRET_KEY as string
);

const toolbox = new Sara.Toolbox();
const Tools = new toolbox.Tools();
// Listing and retrieving tools

//const tools = await Tools.list();
/*
if (tools.count > 0) {
  const id = tools.results[0].uuid;
  const tool = await new toolbox.Tools().retrieve(id);
  console.log(tool);
}
*/
// Create tool

const newTool = await Tools.create({
  name: "My tool",
  description: "My tool description",
  scriptUrl: "http://router.fission.svc.cluster.local/call-elevator",
  paramKeys: [
    {
      name: "param1",
      type: Sara.Toolbox.ParamType.STRING,
    },
  ],
});

console.log("Tool created", newTool);
/*
// Update tool

const toolUpdated = await Tools.update(newTool.uuid, {
  description: "My tool description updated",
});

console.log("Tool updated", toolUpdated);

// List Groups and retrieve one
*/
const Groups = new toolbox.Groups();
/*
const groups = await Groups.list();
if (groups.count > 0) {
  const id = groups.results[0].uuid;
  const group = await new toolbox.Groups().retrieve(id);
  console.log(group);
}
*/
// Create Group

const newGroup = await Groups.create({
  name: "My group",
  description: "My group description",
  iamAction: "MyAction",
});

console.log("Group created", newGroup);
/*
// Update Group

const groupUpdated = await Groups.update(newGroup.uuid, {
  description: "My group description updated",
});

console.log("Group updated", groupUpdated);
*/
try {
  const InstanceTool = new new toolbox.Tools(newTool.uuid).InstanceTools();
  // Create InstanceTool

  const newInstanceTool = await InstanceTool.create({
    name: "My instance tool",
    description: "My instance tool description",
    group: newGroup.uuid,
    iamAction: "MyAction",
    params: {
      param1: "value1",
    },
  });

  console.log("Instance tool created", newInstanceTool);

  // List InstanceTools and retrieve one

  const instanceTools = await InstanceTool.list();
  console.log("instances tools", instanceTools);
  if (instanceTools.count > 0) {
    const id = instanceTools.results[0].uuid;
    const instanceTool = await InstanceTool.retrieve(id);
    console.log("retrieve instanceTool", instanceTool);

    const Executions = new new toolbox.InstanceTools(
      instanceTool.uuid
    ).Executions();

    // Create Execution

    const newExecution = await Executions.create({
      params: {},
    });

    console.log("Execution created", newExecution);

    const executions = await Executions.list();
    console.log("executions", executions);
    if (executions.count > 0) {
      const id = executions.results[0].uuid;

      // Update Execution

      await Executions.update(id, {
        status: Sara.Toolbox.Status.SUCCEEDED,
      });

      // delete execution

      const execution = await Executions.retrieve(id);
      console.log("retrieve execution", execution);
      await Executions.delete(id);
    }
  }
  // delete InstanceTool

  await InstanceTool.delete(newInstanceTool.uuid);

  console.log("Instance tool deleted");
} catch (e) {
  console.log(e);
}
// Delete tool

await Tools.delete(newTool.uuid);

console.log("Tool deleted");

// Delete group

await Groups.delete(newGroup.uuid);

console.log("Group deleted");
