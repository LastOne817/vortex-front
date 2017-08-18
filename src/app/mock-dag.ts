import { DAG } from './dag';

export const dag: DAG = {
  edges: [
    {
      target: 'vertex8',
      properties: {
        attributes: {
          'ChannelDataPlacement': 'LocalFile',
          'ChannelTransferPolicy': 'Pull',
          'CommunicationPattern': 'Broadcast',
          'Partitioning': 'Hash'
        },
        coder: 'FileBasedSink$FileResultCoder(NullableCoder(GlobalWindow$Coder))',
        id: 'edge7',
        type: 'Broadcast'
      },
      source: 'vertex7'
    },
    {
      target: 'vertex5',
      properties: {
        attributes: {
          'ChannelDataPlacement': 'Memory',
          'ChannelTransferPolicy': 'Pull',
          'CommunicationPattern': 'OneToOne',
          'Partitioning': 'Hash'
        },
        coder: 'KvCoder(StringUtf8Coder,VarLongCoder)',
        id: 'edge4',
        type: 'OneToOne'
      },
      source: 'vertex4'
    },
    {
      target: 'vertex4',
      properties: {
        attributes: {
          'ChannelDataPlacement': 'Memory',
          'ChannelTransferPolicy': 'Pull',
          'CommunicationPattern': 'OneToOne',
          'Partitioning': 'Hash'
        },
        coder: 'KvCoder(StringUtf8Coder,IterableCoder(VarLongCoder))',
        id: 'edge3',
        type: 'OneToOne'
      },
      source: 'vertex3'
    },
    {
      target: 'vertex7',
      properties: {
        attributes: {
          'ChannelDataPlacement': 'Memory',
          'ChannelTransferPolicy': 'Pull',
          'CommunicationPattern': 'OneToOne',
          'Partitioning': 'Hash'
        },
        coder: 'StringUtf8Coder',
        id: 'edge6',
        type: 'OneToOne'
      },
      source: 'vertex6'
    },
    {
      target: 'vertex6',
      properties: {
        attributes: {
          'ChannelDataPlacement': 'Memory',
          'ChannelTransferPolicy': 'Pull',
          'CommunicationPattern': 'OneToOne',
          'Partitioning': 'Hash'
        },
        coder: 'StringUtf8Coder',
        id: 'edge5',
        type: 'OneToOne'
      },
      source: 'vertex5'
    },
    {
      target: 'vertex10',
      properties: {
        attributes: {
          'ChannelDataPlacement': 'Memory',
          'ChannelTransferPolicy': 'Pull',
          'CommunicationPattern': 'OneToOne',
          'Partitioning': 'Hash',
          'SideInput': 'SideInput'
        },
        coder: 'IterableCoder(FileBasedSink$FileResultCoder(NullableCoder(GlobalWindow$Coder)))',
        id: 'edge8',
        type: 'OneToOne'
      },
      source: 'vertex8'
    },
    {
      target: 'vertex10',
      properties: {
        attributes: {
          'ChannelDataPlacement': 'Memory',
          'ChannelTransferPolicy': 'Pull',
          'CommunicationPattern': 'OneToOne',
          'Partitioning': 'Hash'
        },
        coder: 'VoidCoder',
        id: 'edge9',
        type: 'OneToOne'
      },
      source: 'vertex9'
    },
    {
      target: 'vertex3',
      properties: {
        attributes: {
          'ChannelDataPlacement': 'LocalFile',
          'ChannelTransferPolicy': 'Pull',
          'CommunicationPattern': 'ScatterGather',
          'Partitioning': 'Hash'
        },
        coder: 'KvCoder(StringUtf8Coder,VarLongCoder)',
        id: 'edge2',
        type: 'ScatterGather'
      },
      source: 'vertex2'
    },
    {
      target: 'vertex2',
      properties: {
        attributes: {
          'ChannelDataPlacement': 'Memory',
          'ChannelTransferPolicy': 'Pull',
          'CommunicationPattern': 'OneToOne',
          'Partitioning': 'Hash'
        },
        coder: 'StringUtf8Coder',
        id: 'edge1',
        type: 'OneToOne'
      },
      source: 'vertex1'
    }
  ],
  'vertices': [
    {
      id: 'vertex1',
      properties: {
        attributes: {
          'Parallelism': 1,
          'Placement': 'None'
        },
        class_: 'BoundedSourceVertex',
        source: '/home/jangho/workspace/vortex/source/main/resources/sample_input_mr'
      }
    },
    {
      id: 'vertex2',
      properties: {
        attributes: {
          'Parallelism': 1,
          'Placement': 'None'
        },
        class_: 'OperatorVertex',
        transform: 'DoTransform:org.apache.beam.sdk.transforms.MapElements$1@22f31f9c'
      }
    },
    {
      id: 'vertex3',
      properties: {
        attributes: {
          'Parallelism': 1,
          'Placement': 'None'
        },
        class_: 'OperatorVertex',
        transform: 'GroupByKeyTransform:edu.snu.vortex.compiler.frontend.beam.transform.GroupByKeyTransform@32bf40a9'
      }
    },
    {
      id: 'vertex4',
      properties: {
        attributes: {
          'Parallelism': 1,
          'Placement': 'None'
        },
        class_: 'OperatorVertex',
        transform: 'DoTransform:org.apache.beam.sdk.transforms.Combine$GroupedValues$1@7561f71f'
      }
    },
    {
      id: 'vertex5',
      properties: {
        attributes: {
          'Parallelism': 1,
          'Placement': 'None'
        },
        class_: 'OperatorVertex',
        transform: 'DoTransform:org.apache.beam.sdk.transforms.MapElements$1@354e1e5'
      }
    },
    {
      id: 'vertex6',
      properties: {
        attributes: {
          'Parallelism': 1,
          'Placement': 'None'
        },
        class_: 'OperatorVertex',
        transform: 'WindowTransform:org.apache.beam.sdk.transforms.windowing.GlobalWindows'
      }
    },
    {
      id: 'vertex7',
      properties: {
        attributes: {
          'Parallelism': 1,
          'Placement': 'None'
        },
        class_: 'OperatorVertex',
        transform: 'DoTransform:org.apache.beam.sdk.io.WriteFiles$WriteUnwindowedBundles@39e101ec'
      }
    },
    {
      id: 'vertex8',
      properties: {
        attributes: {
          'Parallelism': 1,
          'Placement': 'None'
        },
        class_: 'OperatorVertex',
        transform: 'BroadcastTransform:SimplePCollectionView{tag=Tag<org.apache.beam.sdk.values.PCollectionViews' +
        '$SimplePCollectionView.<init>:403#20ff67585e33a8f6>}'
      }
    },
    {
      id: 'vertex9',
      properties: {
        attributes: {
          'Parallelism': 1,
          'Placement': 'None'
        },
        class_: 'BoundedSourceVertex',
        source: '[0, 1)'
      }
    },
    {
      id: 'vertex10',
      properties: {
        attributes: {
          'Parallelism': 1,
          'Placement': 'None'
        },
        class_: 'OperatorVertex',
        transform: 'DoTransform:org.apache.beam.sdk.io.WriteFiles$2@72cc7ae2'
      }
    }
  ]
};
