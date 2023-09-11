// <auto-generated>
//     Generated by the protocol buffer compiler.  DO NOT EDIT!
//     source: Protos/SIDContract.proto
// </auto-generated>
#pragma warning disable 0414, 1591
#region Designer generated code

using grpc = global::Grpc.Core;

namespace MCCGrpcServer {
  public static partial class SID
  {
    static readonly string __ServiceName = "SIdContract.SID";

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static void __Helper_SerializeMessage(global::Google.Protobuf.IMessage message, grpc::SerializationContext context)
    {
      #if !GRPC_DISABLE_PROTOBUF_BUFFER_SERIALIZATION
      if (message is global::Google.Protobuf.IBufferMessage)
      {
        context.SetPayloadLength(message.CalculateSize());
        global::Google.Protobuf.MessageExtensions.WriteTo(message, context.GetBufferWriter());
        context.Complete();
        return;
      }
      #endif
      context.Complete(global::Google.Protobuf.MessageExtensions.ToByteArray(message));
    }

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static class __Helper_MessageCache<T>
    {
      public static readonly bool IsBufferMessage = global::System.Reflection.IntrospectionExtensions.GetTypeInfo(typeof(global::Google.Protobuf.IBufferMessage)).IsAssignableFrom(typeof(T));
    }

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static T __Helper_DeserializeMessage<T>(grpc::DeserializationContext context, global::Google.Protobuf.MessageParser<T> parser) where T : global::Google.Protobuf.IMessage<T>
    {
      #if !GRPC_DISABLE_PROTOBUF_BUFFER_SERIALIZATION
      if (__Helper_MessageCache<T>.IsBufferMessage)
      {
        return parser.ParseFrom(context.PayloadAsReadOnlySequence());
      }
      #endif
      return parser.ParseFrom(context.PayloadAsNewBuffer());
    }

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static readonly grpc::Marshaller<global::MCCGrpcServer.GetAllRequest> __Marshaller_SIdContract_GetAllRequest = grpc::Marshallers.Create(__Helper_SerializeMessage, context => __Helper_DeserializeMessage(context, global::MCCGrpcServer.GetAllRequest.Parser));
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static readonly grpc::Marshaller<global::MCCGrpcServer.SIdResponse> __Marshaller_SIdContract_SIdResponse = grpc::Marshallers.Create(__Helper_SerializeMessage, context => __Helper_DeserializeMessage(context, global::MCCGrpcServer.SIdResponse.Parser));
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static readonly grpc::Marshaller<global::MCCGrpcServer.SIdModel> __Marshaller_SIdContract_SIdModel = grpc::Marshallers.Create(__Helper_SerializeMessage, context => __Helper_DeserializeMessage(context, global::MCCGrpcServer.SIdModel.Parser));
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static readonly grpc::Marshaller<global::MCCGrpcServer.insertupdatedelete_response> __Marshaller_SIdContract_insertupdatedelete_response = grpc::Marshallers.Create(__Helper_SerializeMessage, context => __Helper_DeserializeMessage(context, global::MCCGrpcServer.insertupdatedelete_response.Parser));
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static readonly grpc::Marshaller<global::MCCGrpcServer.UpdateDefmodResquest> __Marshaller_SIdContract_UpdateDefmodResquest = grpc::Marshallers.Create(__Helper_SerializeMessage, context => __Helper_DeserializeMessage(context, global::MCCGrpcServer.UpdateDefmodResquest.Parser));
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static readonly grpc::Marshaller<global::MCCGrpcServer.DeleteSIDRequest> __Marshaller_SIdContract_DeleteSIDRequest = grpc::Marshallers.Create(__Helper_SerializeMessage, context => __Helper_DeserializeMessage(context, global::MCCGrpcServer.DeleteSIDRequest.Parser));
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static readonly grpc::Marshaller<global::MCCGrpcServer.DeletePIDRequest> __Marshaller_SIdContract_DeletePIDRequest = grpc::Marshallers.Create(__Helper_SerializeMessage, context => __Helper_DeserializeMessage(context, global::MCCGrpcServer.DeletePIDRequest.Parser));

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static readonly grpc::Method<global::MCCGrpcServer.GetAllRequest, global::MCCGrpcServer.SIdResponse> __Method_GetSidList = new grpc::Method<global::MCCGrpcServer.GetAllRequest, global::MCCGrpcServer.SIdResponse>(
        grpc::MethodType.Unary,
        __ServiceName,
        "GetSidList",
        __Marshaller_SIdContract_GetAllRequest,
        __Marshaller_SIdContract_SIdResponse);

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static readonly grpc::Method<global::MCCGrpcServer.GetAllRequest, global::MCCGrpcServer.SIdResponse> __Method_GetNEWSidList = new grpc::Method<global::MCCGrpcServer.GetAllRequest, global::MCCGrpcServer.SIdResponse>(
        grpc::MethodType.Unary,
        __ServiceName,
        "GetNEWSidList",
        __Marshaller_SIdContract_GetAllRequest,
        __Marshaller_SIdContract_SIdResponse);

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static readonly grpc::Method<global::MCCGrpcServer.SIdModel, global::MCCGrpcServer.insertupdatedelete_response> __Method_InsertSID = new grpc::Method<global::MCCGrpcServer.SIdModel, global::MCCGrpcServer.insertupdatedelete_response>(
        grpc::MethodType.Unary,
        __ServiceName,
        "InsertSID",
        __Marshaller_SIdContract_SIdModel,
        __Marshaller_SIdContract_insertupdatedelete_response);

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static readonly grpc::Method<global::MCCGrpcServer.SIdModel, global::MCCGrpcServer.insertupdatedelete_response> __Method_UpdateSID = new grpc::Method<global::MCCGrpcServer.SIdModel, global::MCCGrpcServer.insertupdatedelete_response>(
        grpc::MethodType.Unary,
        __ServiceName,
        "UpdateSID",
        __Marshaller_SIdContract_SIdModel,
        __Marshaller_SIdContract_insertupdatedelete_response);

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static readonly grpc::Method<global::MCCGrpcServer.UpdateDefmodResquest, global::MCCGrpcServer.insertupdatedelete_response> __Method_UpdateSIDDefMode = new grpc::Method<global::MCCGrpcServer.UpdateDefmodResquest, global::MCCGrpcServer.insertupdatedelete_response>(
        grpc::MethodType.Unary,
        __ServiceName,
        "UpdateSIDDefMode",
        __Marshaller_SIdContract_UpdateDefmodResquest,
        __Marshaller_SIdContract_insertupdatedelete_response);

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static readonly grpc::Method<global::MCCGrpcServer.DeleteSIDRequest, global::MCCGrpcServer.insertupdatedelete_response> __Method_DeleteSID = new grpc::Method<global::MCCGrpcServer.DeleteSIDRequest, global::MCCGrpcServer.insertupdatedelete_response>(
        grpc::MethodType.Unary,
        __ServiceName,
        "DeleteSID",
        __Marshaller_SIdContract_DeleteSIDRequest,
        __Marshaller_SIdContract_insertupdatedelete_response);

    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    static readonly grpc::Method<global::MCCGrpcServer.DeletePIDRequest, global::MCCGrpcServer.insertupdatedelete_response> __Method_DeleteParameterId = new grpc::Method<global::MCCGrpcServer.DeletePIDRequest, global::MCCGrpcServer.insertupdatedelete_response>(
        grpc::MethodType.Unary,
        __ServiceName,
        "DeleteParameterId",
        __Marshaller_SIdContract_DeletePIDRequest,
        __Marshaller_SIdContract_insertupdatedelete_response);

    /// <summary>Service descriptor</summary>
    public static global::Google.Protobuf.Reflection.ServiceDescriptor Descriptor
    {
      get { return global::MCCGrpcServer.SIDContractReflection.Descriptor.Services[0]; }
    }

    /// <summary>Base class for server-side implementations of SID</summary>
    [grpc::BindServiceMethod(typeof(SID), "BindService")]
    public abstract partial class SIDBase
    {
      [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
      public virtual global::System.Threading.Tasks.Task<global::MCCGrpcServer.SIdResponse> GetSidList(global::MCCGrpcServer.GetAllRequest request, grpc::ServerCallContext context)
      {
        throw new grpc::RpcException(new grpc::Status(grpc::StatusCode.Unimplemented, ""));
      }

      [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
      public virtual global::System.Threading.Tasks.Task<global::MCCGrpcServer.SIdResponse> GetNEWSidList(global::MCCGrpcServer.GetAllRequest request, grpc::ServerCallContext context)
      {
        throw new grpc::RpcException(new grpc::Status(grpc::StatusCode.Unimplemented, ""));
      }

      [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
      public virtual global::System.Threading.Tasks.Task<global::MCCGrpcServer.insertupdatedelete_response> InsertSID(global::MCCGrpcServer.SIdModel request, grpc::ServerCallContext context)
      {
        throw new grpc::RpcException(new grpc::Status(grpc::StatusCode.Unimplemented, ""));
      }

      [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
      public virtual global::System.Threading.Tasks.Task<global::MCCGrpcServer.insertupdatedelete_response> UpdateSID(global::MCCGrpcServer.SIdModel request, grpc::ServerCallContext context)
      {
        throw new grpc::RpcException(new grpc::Status(grpc::StatusCode.Unimplemented, ""));
      }

      [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
      public virtual global::System.Threading.Tasks.Task<global::MCCGrpcServer.insertupdatedelete_response> UpdateSIDDefMode(global::MCCGrpcServer.UpdateDefmodResquest request, grpc::ServerCallContext context)
      {
        throw new grpc::RpcException(new grpc::Status(grpc::StatusCode.Unimplemented, ""));
      }

      [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
      public virtual global::System.Threading.Tasks.Task<global::MCCGrpcServer.insertupdatedelete_response> DeleteSID(global::MCCGrpcServer.DeleteSIDRequest request, grpc::ServerCallContext context)
      {
        throw new grpc::RpcException(new grpc::Status(grpc::StatusCode.Unimplemented, ""));
      }

      [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
      public virtual global::System.Threading.Tasks.Task<global::MCCGrpcServer.insertupdatedelete_response> DeleteParameterId(global::MCCGrpcServer.DeletePIDRequest request, grpc::ServerCallContext context)
      {
        throw new grpc::RpcException(new grpc::Status(grpc::StatusCode.Unimplemented, ""));
      }

    }

    /// <summary>Creates service definition that can be registered with a server</summary>
    /// <param name="serviceImpl">An object implementing the server-side handling logic.</param>
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public static grpc::ServerServiceDefinition BindService(SIDBase serviceImpl)
    {
      return grpc::ServerServiceDefinition.CreateBuilder()
          .AddMethod(__Method_GetSidList, serviceImpl.GetSidList)
          .AddMethod(__Method_GetNEWSidList, serviceImpl.GetNEWSidList)
          .AddMethod(__Method_InsertSID, serviceImpl.InsertSID)
          .AddMethod(__Method_UpdateSID, serviceImpl.UpdateSID)
          .AddMethod(__Method_UpdateSIDDefMode, serviceImpl.UpdateSIDDefMode)
          .AddMethod(__Method_DeleteSID, serviceImpl.DeleteSID)
          .AddMethod(__Method_DeleteParameterId, serviceImpl.DeleteParameterId).Build();
    }

    /// <summary>Register service method with a service binder with or without implementation. Useful when customizing the  service binding logic.
    /// Note: this method is part of an experimental API that can change or be removed without any prior notice.</summary>
    /// <param name="serviceBinder">Service methods will be bound by calling <c>AddMethod</c> on this object.</param>
    /// <param name="serviceImpl">An object implementing the server-side handling logic.</param>
    [global::System.CodeDom.Compiler.GeneratedCode("grpc_csharp_plugin", null)]
    public static void BindService(grpc::ServiceBinderBase serviceBinder, SIDBase serviceImpl)
    {
      serviceBinder.AddMethod(__Method_GetSidList, serviceImpl == null ? null : new grpc::UnaryServerMethod<global::MCCGrpcServer.GetAllRequest, global::MCCGrpcServer.SIdResponse>(serviceImpl.GetSidList));
      serviceBinder.AddMethod(__Method_GetNEWSidList, serviceImpl == null ? null : new grpc::UnaryServerMethod<global::MCCGrpcServer.GetAllRequest, global::MCCGrpcServer.SIdResponse>(serviceImpl.GetNEWSidList));
      serviceBinder.AddMethod(__Method_InsertSID, serviceImpl == null ? null : new grpc::UnaryServerMethod<global::MCCGrpcServer.SIdModel, global::MCCGrpcServer.insertupdatedelete_response>(serviceImpl.InsertSID));
      serviceBinder.AddMethod(__Method_UpdateSID, serviceImpl == null ? null : new grpc::UnaryServerMethod<global::MCCGrpcServer.SIdModel, global::MCCGrpcServer.insertupdatedelete_response>(serviceImpl.UpdateSID));
      serviceBinder.AddMethod(__Method_UpdateSIDDefMode, serviceImpl == null ? null : new grpc::UnaryServerMethod<global::MCCGrpcServer.UpdateDefmodResquest, global::MCCGrpcServer.insertupdatedelete_response>(serviceImpl.UpdateSIDDefMode));
      serviceBinder.AddMethod(__Method_DeleteSID, serviceImpl == null ? null : new grpc::UnaryServerMethod<global::MCCGrpcServer.DeleteSIDRequest, global::MCCGrpcServer.insertupdatedelete_response>(serviceImpl.DeleteSID));
      serviceBinder.AddMethod(__Method_DeleteParameterId, serviceImpl == null ? null : new grpc::UnaryServerMethod<global::MCCGrpcServer.DeletePIDRequest, global::MCCGrpcServer.insertupdatedelete_response>(serviceImpl.DeleteParameterId));
    }

  }
}
#endregion
